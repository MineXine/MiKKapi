"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
let ThemeService = class ThemeService {
    constructor(themeModel) {
        this.themeModel = themeModel;
    }
    async list(userId) {
        return this.themeModel.find({ user: userId }).sort({ createdAt: 1 }).exec();
    }
    async findOne(userId, id) {
        return this.themeModel.findOne({ _id: id, user: userId }).exec();
    }
    async create(userId, payload) {
        const key = payload.key || payload.name;
        const exists = await this.themeModel.findOne({ user: userId, key }).exec();
        if (exists) {
            throw new Error('主题标识已存在');
        }
        return this.themeModel.create({
            user: userId,
            name: payload.name,
            key,
            mode: payload.mode || constant_1.ThemeMode.LIGHT,
            tokens: payload.tokens || {},
            color: payload.color || '#DB2828',
            followSystem: !!payload.followSystem,
        });
    }
    async update(userId, id, payload) {
        const allowed = ['name', 'mode', 'tokens', 'color', 'followSystem'];
        const update = {};
        allowed.forEach((key) => {
            if (payload[key] !== undefined)
                update[key] = payload[key];
        });
        return this.themeModel.updateOne({ _id: id, user: userId }, { $set: update }).exec();
    }
    async remove(userId, id) {
        return this.themeModel.findOneAndDelete({ _id: id, user: userId }).exec();
    }
    async ensureBuiltinThemes(userId) {
        const existing = await this.themeModel
            .countDocuments({ user: userId, builtin: true })
            .exec();
        if (existing > 0)
            return [];
        const builtin = [
            {
                name: '默认浅色',
                key: 'default',
                mode: constant_1.ThemeMode.LIGHT,
                color: '#DB2828',
                tokens: {
                    '--note-bg': '#ffffff',
                    '--note-fg': '#1f2328',
                    '--note-muted': '#6b7280',
                    '--note-accent': '#DB2828',
                    '--note-border': '#e5e7eb',
                    '--note-radius': '10px',
                    '--note-font-size': '15px',
                },
            },
            {
                name: '默认深色',
                key: 'dark',
                mode: constant_1.ThemeMode.DARK,
                color: '#4C6EF5',
                tokens: {
                    '--note-bg': '#16181d',
                    '--note-fg': '#e6e6e6',
                    '--note-muted': '#9aa0a6',
                    '--note-accent': '#4C6EF5',
                    '--note-border': '#2b2f36',
                    '--note-radius': '10px',
                    '--note-font-size': '15px',
                },
            },
            {
                name: '护眼',
                key: 'sepia',
                mode: constant_1.ThemeMode.SEPIA,
                color: '#B08968',
                tokens: {
                    '--note-bg': '#fbf4e4',
                    '--note-fg': '#3d3226',
                    '--note-muted': '#8a7a63',
                    '--note-accent': '#B08968',
                    '--note-border': '#e5d9c0',
                    '--note-radius': '8px',
                    '--note-font-size': '16px',
                },
            },
        ];
        const created = [];
        for (const item of builtin) {
            created.push(await this.themeModel.create({ ...item, user: userId, builtin: true }));
        }
        return created;
    }
};
ThemeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Theme)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ThemeService);
exports.ThemeService = ThemeService;
//# sourceMappingURL=theme.service.js.map