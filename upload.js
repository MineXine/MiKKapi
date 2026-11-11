/**
 * 通过 GitHub Git Data API 上传编译产物。
 * git push 的 POST 在当前代理下不可用，改走 api.github.com（已验证可用）。
 *
 * 流程：分批创建 tree（inline content）→ 创建 commit → 更新 ref。
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OWNER = 'MineXine';
const REPO = 'MiKKapi';
const ROOT = process.argv[2];
const BATCH_FILES = 40;
const BATCH_BYTES = 280 * 1024;

const TOKEN = execSync('gh auth token', { encoding: 'utf8' }).trim();
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

async function api(pathname, options = {}) {
  const res = await fetch(`${API}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'mikkapi-uploader',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${pathname}: ${JSON.stringify(body).slice(0, 400)}`);
  }
  return body;
}

/** 递归收集所有文件（相对路径 + 内容） */
function collect(dir, base = '') {
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    if (name === '.git') continue;
    const abs = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      out.push(...collect(abs, rel));
    } else {
      const content = fs.readFileSync(abs, 'utf8');
      out.push({ path: rel, content });
    }
  }
  return out;
}

(async () => {
  const files = collect(ROOT);
  const totalBytes = files.reduce((s, f) => s + Buffer.byteLength(f.content), 0);
  console.log(`待上传文件：${files.length} 个，共 ${(totalBytes / 1024).toFixed(0)} KB`);

  // 以远端 main 现有提交为基准
  const ref = await api(`/git/ref/heads/main`);
  const baseCommit = await api(`/git/commits/${ref.object.sha}`);
  let baseTree = baseCommit.tree.sha;
  console.log(`基准 tree：${baseTree}`);

  // 分批
  const batches = [];
  let cur = [];
  let curBytes = 0;
  for (const f of files) {
    const size = Buffer.byteLength(f.content);
    if (cur.length && (cur.length >= BATCH_FILES || curBytes + size > BATCH_BYTES)) {
      batches.push(cur);
      cur = [];
      curBytes = 0;
    }
    cur.push(f);
    curBytes += size;
  }
  if (cur.length) batches.push(cur);
  console.log(`分批：${batches.length} 批`);

  // 逐批创建 tree（每批以上一批结果为 base_tree）
  let treeSha = baseTree;
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const tree = await api('/git/trees', {
      method: 'POST',
      body: JSON.stringify({
        base_tree: treeSha,
        tree: batch.map((f) => ({
          path: f.path,
          mode: '100644',
          type: 'blob',
          content: f.content,
        })),
      }),
    });
    if (tree.truncated) {
      throw new Error(`第 ${i + 1} 批被截断，需减小批次`);
    }
    treeSha = tree.sha;
    console.log(`  批次 ${i + 1}/${batches.length}：${batch.length} 文件 → ${treeSha.slice(0, 8)}`);
  }

  // 创建 commit
  const commit = await api('/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message: `feat: MiKKapi 编译产物 —— NestJS + MongoDB 笔记开放接口服务

由 kkapi-api 源码工程构建（nest build），产物平铺至仓库根目录，可直接部署到 Vercel。

包含：
- ispeak 笔记主体：可见性(public/private)、时间线/日历/地图视图、全文搜索、归档与恢复、分享
- notes 增强域：点赞、收藏、草稿自动保留、附件与媒体、多主题、Views 视图、MDC 自定义组件与选项注入、设备信息
- users/auth/openApi/friendCircle 原有模块

入口 main.js，vercel.json 指向该文件。`,
      tree: treeSha,
      parents: [ref.object.sha],
    }),
  });
  console.log(`commit：${commit.sha}`);

  // 更新 main 引用
  await api('/git/refs/heads/main', {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  console.log(`✔ main 已更新至 ${commit.sha}`);
})().catch((err) => {
  console.error('✘ 失败：', err.message);
  process.exit(1);
});
