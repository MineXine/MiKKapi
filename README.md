# MiKKapi

轻量笔记开放接口服务 —— **NestJS 8 + MongoDB**，本仓库存放**编译产物**，可直接部署到 Vercel。

- 源码工程：本地 `kkapi-api/`（NestJS + Mongoose，含 50 个测试）
- 本仓库：与源码工程 `dist/` 一致的编译产物，根目录即运行入口

## 目录结构

```
main.js                 # 入口（vercel.json 指向此文件）
app.module.js           # 模块装配
common/                 # 业务枚举 / 设备解析 / MDC 引擎 / 存储抽象
constant/               # 集合名常量
Model/                  # 统一响应体
filters/ interceptor/ pipe/
modules/
├── auth/               # JWT 与本地策略、全局守卫
├── users/              # 用户、Token、GitHub OAuth、个人偏好
├── ispeak/             # 笔记主体：内容 / 标签 / 可见性 / 时间线 / 日历 / 地图 / 搜索 / 归档 / 分享
├── notes/              # 增强域：点赞 / 收藏 / 分享记录 / 草稿 / 附件 / Views / MDC 注册表 / 主题 / 设备信息
├── openApi/            # 第三方接口代理（QQ / 微信 / Telegram / GitHub / HTTP / 通知）
└── friendCircle/       # 遗留骨架
```

每个模块同时包含 `.js`（运行）、`.js.map`（调试）、`.d.ts`（类型声明）三类文件。

## 部署

本仓库根目录即 Vercel 的构建输入，`vercel.json` 已配置好：

```json
{ "version": 2, "builds": [{ "src": "main.js", "use": "@vercel/node" }] }
```

```bash
npm install -g vercel
vercel --prod
```

### 必需环境变量

| 变量 | 说明 |
|---|---|
| `DATABASE_URL` | MongoDB 连接串 |
| `DATABASE_USER` / `DATABASE_PASSWORD` | 数据库账号密码（可选） |
| `SECRETKEY` | JWT 签名密钥 |

### 常用可选环境变量

| 变量 | 默认 | 说明 |
|---|---|---|
| `JWT_EXPIRES_IN` | `12H` | Token 有效期 |
| `STORAGE_DRIVER` | `base64` | 附件存储：`base64` / `local` / `url`（Vercel 只读文件系统请用 `base64` 或 `url`） |
| `STORAGE_INLINE_MAX_SIZE` | `5242880` | 内联存储单文件上限（字节） |
| `SHARE_BASE_URL` | — | 分享链接拼接的前端地址 |
| `AUTO_CREATE_TEXT_INDEX` | `true` | 启动时自动创建全文索引 |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | — | GitHub OAuth 登录 |

## 接口概览

- 全局前缀 `/api`
- 统一响应体 `{ data, message, type, code }`，成功 `code = 0`
- 鉴权：`Authorization: Bearer <token>`；`@NoAuth()` 的接口免登录

<details>
<summary>主要接口（点击展开）</summary>

| 分组 | 接口 |
|---|---|
| 用户 | `POST /api/user/login`、`GET /api/user/getUserInfo`、`PATCH /api/user/preference`、`/api/user/token/*` |
| 笔记 | `GET /api/ispeak`、`POST /api/ispeak/add`、`PATCH /api/ispeak/update`、`DELETE /api/ispeak/:id` |
| 可见性 | `PATCH /api/ispeak/visibility` |
| 分享 | `PATCH /api/ispeak/share`、`GET /api/ispeak/share/:token`、`POST /api/note/share` |
| 组织检索 | `GET /api/ispeak/timeline`、`/calendar`、`/map`、`/search`、`/archived`、`/stats` |
| 归档 | `PATCH /api/ispeak/archive`、`PATCH /api/ispeak/restore` |
| 标签 | `GET /api/ispeak/tag/overview` |
| 草稿 | `POST /api/note/draft/autosave`、`GET /api/note/draft` |
| 附件 | `POST /api/note/attachment`、`GET /api/note/attachment` |
| MDC | `POST /api/note/mdc/components`、`POST /api/note/mdc/render` |
| 主题 | `GET /api/note/theme`、`PATCH /api/note/theme/active` |
| 视图 | `GET /api/note/view`、`POST /api/note/view` |
| 互动 | `POST /api/note/like`、`POST /api/note/favorite` |
| 设备 | `GET /api/device` |
| 第三方 | `GET /api/openapi/version`、`/api/open/*` |

</details>

## 重新构建

在源码工程目录执行：

```bash
npm install
npm run build     # 产物输出到 dist/
```

再把 `dist/` 的内容平铺到本仓库根目录替换即可。

## 数据迁移提示

若从旧版（仅有 `type` 字段的三态可见性）升级，执行一次：

```js
db.kkapi_ispeak_list.updateMany(
  { visibility: { $exists: false } },
  { $set: { visibility: 'public', status: 'published' } }
)
```
