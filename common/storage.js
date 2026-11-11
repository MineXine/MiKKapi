"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guessKind = exports.removeAttachment = exports.saveAttachment = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const constant_1 = require("./constant");
function currentDriver() {
    const raw = (process.env.STORAGE_DRIVER || constant_1.StorageDriver.BASE64).toLowerCase();
    if (raw === 'local' || raw === 'url')
        return raw;
    return constant_1.StorageDriver.BASE64;
}
function inlineMaxSize() {
    const n = Number(process.env.STORAGE_INLINE_MAX_SIZE);
    return Number.isFinite(n) && n > 0 ? n : 5 * 1024 * 1024;
}
class Base64Storage {
    async save(input) {
        if (!input.data) {
            throw new Error('base64 存储驱动需要提供 data 字段');
        }
        const mime = input.mime || 'application/octet-stream';
        const buffer = Buffer.from(input.data, 'base64');
        if (buffer.length > inlineMaxSize()) {
            throw new Error(`文件超过内联存储上限（${inlineMaxSize()} 字节），请改用 local / url 驱动或接入对象存储`);
        }
        const key = `${Date.now()}-${(0, utils_1.randomToken)(8)}-${safeName(input.filename)}`;
        return {
            key,
            url: `data:${mime};base64,${input.data}`,
            size: buffer.length,
            driver: constant_1.StorageDriver.BASE64,
        };
    }
    async remove(_key) {
        return true;
    }
}
class LocalStorage {
    constructor(baseDir) {
        this.baseDir = baseDir;
    }
    async save(input) {
        if (!input.data) {
            throw new Error('local 存储驱动需要提供 data 字段');
        }
        const buffer = Buffer.from(input.data, 'base64');
        const key = `${Date.now()}-${(0, utils_1.randomToken)(8)}-${safeName(input.filename)}`;
        const dir = path.resolve(this.baseDir);
        await fs.promises.mkdir(dir, { recursive: true });
        await fs.promises.writeFile(path.join(dir, key), buffer);
        const publicBase = process.env.UPLOAD_PUBLIC_BASE || `/uploads`;
        return {
            key,
            url: `${publicBase.replace(/\/$/, '')}/${key}`,
            size: buffer.length,
            driver: constant_1.StorageDriver.LOCAL,
        };
    }
    async remove(key) {
        try {
            const dir = path.resolve(this.baseDir);
            await fs.promises.unlink(path.join(dir, path.basename(key)));
            return true;
        }
        catch {
            return false;
        }
    }
}
class UrlStorage {
    async save(input) {
        if (!input.url) {
            throw new Error('url 存储驱动需要提供 url 字段');
        }
        return {
            key: input.url,
            url: input.url,
            size: input.size || 0,
            driver: constant_1.StorageDriver.URL,
        };
    }
    async remove(_key) {
        return true;
    }
}
function safeName(filename) {
    return (filename || 'file').replace(/[^\w.-]/g, '_').slice(-80);
}
async function saveAttachment(input) {
    const driver = currentDriver();
    switch (driver) {
        case constant_1.StorageDriver.LOCAL:
            return new LocalStorage(process.env.UPLOAD_DIR || path.join(process.cwd(), '.uploads')).save(input);
        case constant_1.StorageDriver.URL:
            return new UrlStorage().save(input);
        case constant_1.StorageDriver.BASE64:
        default:
            return new Base64Storage().save(input);
    }
}
exports.saveAttachment = saveAttachment;
async function removeAttachment(key) {
    const driver = currentDriver();
    if (driver === constant_1.StorageDriver.LOCAL) {
        return new LocalStorage(process.env.UPLOAD_DIR || path.join(process.cwd(), '.uploads')).remove(key);
    }
    return true;
}
exports.removeAttachment = removeAttachment;
function guessKind(mime = '', filename = '') {
    const m = (mime || '').toLowerCase();
    if (m.startsWith('image/'))
        return 'image';
    if (m.startsWith('video/'))
        return 'video';
    if (m.startsWith('audio/'))
        return 'audio';
    const ext = (filename.split('.').pop() || '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'].includes(ext))
        return 'image';
    if (['mp4', 'webm', 'mov', 'm3u8'].includes(ext))
        return 'video';
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].includes(ext))
        return 'audio';
    return 'file';
}
exports.guessKind = guessKind;
//# sourceMappingURL=storage.js.map