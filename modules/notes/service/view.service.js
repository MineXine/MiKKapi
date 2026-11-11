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
exports.ViewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
let ViewService = class ViewService {
    constructor(viewModel) {
        this.viewModel = viewModel;
    }
    async create(userId, payload) {
        return this.viewModel.create({
            user: userId,
            name: payload.name,
            type: payload.type || constant_1.ViewType.CUSTOM,
            description: payload.description || '',
            filters: payload.filters || {},
            sort: payload.sort,
            layout: payload.layout || {},
            icon: payload.icon || '',
            color: payload.color || '#DB2828',
            pinned: !!payload.pinned,
        });
    }
    async list(userId) {
        return this.viewModel
            .find({ user: userId })
            .sort({ pinned: -1, createdAt: 1 })
            .exec();
    }
    async findOne(userId, id) {
        return this.viewModel.findOne({ _id: id, user: userId }).exec();
    }
    async update(userId, id, payload) {
        const allowed = [
            'name',
            'type',
            'description',
            'filters',
            'sort',
            'layout',
            'icon',
            'color',
            'pinned',
        ];
        const update = {};
        allowed.forEach((key) => {
            if (payload[key] !== undefined)
                update[key] = payload[key];
        });
        return this.viewModel.updateOne({ _id: id, user: userId }, { $set: update }).exec();
    }
    async remove(userId, id) {
        return this.viewModel.findOneAndDelete({ _id: id, user: userId }).exec();
    }
    async ensureBuiltinViews(userId) {
        const existing = await this.viewModel
            .countDocuments({ user: userId, builtin: true })
            .exec();
        if (existing > 0)
            return [];
        const builtin = [
            {
                name: '全部笔记',
                type: constant_1.ViewType.TIMELINE,
                description: '按时间倒序展示全部笔记',
                filters: {},
                icon: '📚',
                color: '#DB2828',
                pinned: true,
            },
            {
                name: '公开笔记',
                type: constant_1.ViewType.TIMELINE,
                description: '仅展示公开可见的笔记',
                filters: { visibility: 'public' },
                icon: '🌍',
                color: '#2F9E44',
            },
            {
                name: '私密笔记',
                type: constant_1.ViewType.TIMELINE,
                description: '仅展示仅自己可见的笔记',
                filters: { visibility: 'private' },
                icon: '🔒',
                color: '#7048E8',
            },
            {
                name: '带图笔记',
                type: constant_1.ViewType.GALLERY,
                description: '包含图片附件的笔记',
                filters: { hasAttachment: true },
                layout: { columns: 3, showCover: true },
                icon: '🖼️',
                color: '#F08C00',
            },
            {
                name: '有位置的笔记',
                type: constant_1.ViewType.MAP,
                description: '包含地理位置的笔记',
                filters: { hasLocation: true },
                icon: '📍',
                color: '#1971C2',
            },
            {
                name: '待整理',
                type: constant_1.ViewType.CUSTOM,
                description: '既没有标签也没有位置的笔记',
                filters: { noTag: true },
                icon: '🗂️',
                color: '#868E96',
            },
        ];
        const created = [];
        for (const item of builtin) {
            created.push(await this.viewModel.create({
                ...item,
                user: userId,
                builtin: true,
            }));
        }
        return created;
    }
};
ViewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.View)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ViewService);
exports.ViewService = ViewService;
//# sourceMappingURL=view.service.js.map