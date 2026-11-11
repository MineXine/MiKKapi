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
exports.IspeakController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const customize_1 = require("../../../common/decorator/customize");
const token_name_1 = require("../../../constant/token-name");
const Response_modal_1 = require("../../../Model/Response.modal");
const token_service_1 = require("../../users/services/token.service");
const ispeak_service_1 = require("../service/ispeak.service");
const constant_1 = require("../../../common/constant");
const utils_1 = require("../../../common/utils");
const device_1 = require("../../../common/device");
let IspeakController = class IspeakController {
    constructor(ispeakService, tokenService) {
        this.ispeakService = ispeakService;
        this.tokenService = tokenService;
    }
    async getSpeakByPage(req, query) {
        const { author } = query;
        let { page = 1, pageSize = 10 } = query;
        if (!author) {
            return new Response_modal_1.ErrorModal(null, '需要指定查询的用户');
        }
        const type = ['0', '1'];
        if (req?.user?.userId && req?.user?.userId === author) {
            type.push('2');
        }
        try {
            page = Number(page);
            pageSize = Number(pageSize);
        }
        catch (error) {
            return new Response_modal_1.ErrorModal(null, '请传入正确的参数');
        }
        const result = await this.ispeakService.getSpeakByPage(page, pageSize, {
            author,
            requesterId: req?.user?.userId,
            type,
            tags: query.tags ? String(query.tags).split(',') : undefined,
            tag: query.tag,
            status: query.status,
            includeArchived: query.includeArchived === 'true',
        });
        const returnObj = {
            total: 0,
            items: [],
            isLogin: req?.user?.userId ? req.user.userId : null,
        };
        result.forEach((res) => {
            returnObj.total = res.total ? res.total[0]?.total : 0;
            res.items.forEach((item) => {
                item.author = item.author
                    ? {
                        nickName: item.author[0]?.nickName,
                        avatar: item.author[0]?.avatar,
                    }
                    : { nickName: '', avatar: '' };
                item.tag = item.tag ? item.tag[0] : {};
                item.tags = Array.isArray(item.tags) ? item.tags : [];
                item.deviceLabel = item.device ? (0, device_1.formatDevice)(item.device) : '';
                returnObj.items.push(this.maskItem(item, req));
            });
        });
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async getIspeakByPage(query, req) {
        const { page, pageSize, _t, ...otherQuery } = query;
        const queryOptions = { ...otherQuery };
        queryOptions['author'] = queryOptions.author || req.user?.userId;
        queryOptions['requesterId'] = req.user?.userId;
        if (queryOptions.tags) {
            queryOptions.tags = String(queryOptions.tags).split(',');
        }
        const result = await this.ispeakService.getSpeakByPage(Number(page) || 1, Number(pageSize) || 10, queryOptions);
        const returnObj = { total: 0, items: [] };
        if (result.length > 0) {
            result.forEach((item) => {
                if (item.total.length > 0) {
                    returnObj.total += item.total[0].total;
                    item.items.forEach((note) => {
                        note.author = note.author
                            ? { nickName: note.author[0]?.nickName, avatar: note.author[0]?.avatar }
                            : { nickName: '', avatar: '' };
                        note.tag = note.tag ? note.tag[0] : {};
                        note.tags = Array.isArray(note.tags) ? note.tags : [];
                        note.deviceLabel = note.device ? (0, device_1.formatDevice)(note.device) : '';
                        returnObj.items.push(this.maskItem(note, req));
                    });
                }
            });
        }
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async addOneSpeak(req, body) {
        const userId = req.user.userId;
        const result = await this.ispeakService.addOneSpeak(this.buildNotePayload(body, userId, req));
        return new Response_modal_1.SuccessModal(result);
    }
    async addOneSpeakByToken(body) {
        const { tag, token } = body;
        const user = await this.tokenService.getOneToken({
            title: token_name_1.TokenName.Speak,
            value: token,
        });
        if (!user) {
            return new Response_modal_1.ErrorModal(null, '此token不存在');
        }
        if (tag && !(0, mongoose_1.isValidObjectId)(tag)) {
            return new Response_modal_1.ErrorModal(null, '请传入标签的id');
        }
        const result = await this.ispeakService.addOneSpeak(this.buildNotePayload(body, user.user, null, { tag }));
        return new Response_modal_1.SuccessModal(result);
    }
    async updateSpeak(body, req) {
        const { _id, ...updateData } = body;
        const updateAuthor = req.user.userId;
        const res = await this.ispeakService.findOneAndUpdate({ _id, author: updateAuthor }, updateData);
        if (res.acknowledged && res.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(res, '更新成功');
        }
        if (res.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(res, '没有找到对应speak');
        }
        return new Response_modal_1.ErrorModal(res, '更新失败');
    }
    async updateSpeakStatus(body, req) {
        const { _id, showComment } = body;
        const updateAuthor = req.user.userId;
        const result = await this.ispeakService.findOneAndUpdate({ _id, author: updateAuthor }, { showComment });
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '更新成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应speak');
        }
        return new Response_modal_1.ErrorModal(result, '更新失败');
    }
    async deleteOneSpeak(param) {
        if (!param.id || !(0, mongoose_1.isValidObjectId)(param?.id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        const res = await this.ispeakService.findOneAndDelete({ _id: param.id });
        return new Response_modal_1.SuccessModal(res);
    }
    async getOneSpeak(param, req) {
        if (!param.id || !(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        const res = await this.ispeakService.findOneDoc({ _id: param.id });
        if (!res) {
            return new Response_modal_1.ErrorModal(null, '没有找到对应的笔记');
        }
        const isOwner = req?.user?.userId === res.author?.toString();
        if (!isOwner && res.visibility === constant_1.NoteVisibility.PRIVATE) {
            return new Response_modal_1.ErrorModal(null, '该内容为私密内容');
        }
        if (!isOwner &&
            res.requireLogin &&
            !req?.user?.userId) {
            return new Response_modal_1.ErrorModal(null, '该内容需登录后查看');
        }
        return new Response_modal_1.SuccessModal(res);
    }
    async updateVisibility(body, req) {
        const { _id, visibility } = body;
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        if (!Object.values(constant_1.NoteVisibility).includes(visibility)) {
            return new Response_modal_1.ErrorModal(null, '可见性只能是 public 或 private');
        }
        const result = await this.ispeakService.updateVisibility(_id, req.user.userId, visibility);
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '可见性更新成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应笔记或无权限');
        }
        return new Response_modal_1.ErrorModal(result, '更新失败');
    }
    async updateShare(body, req) {
        const { _id, shareEnabled = true, expireDays } = body;
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        const shareToken = (0, utils_1.randomToken)(20);
        const expireAt = expireDays && Number(expireDays) > 0
            ? new Date(Date.now() + Number(expireDays) * 24 * 60 * 60 * 1000)
            : null;
        const result = await this.ispeakService.updateShare(_id, req.user.userId, !!shareEnabled, shareToken, expireAt);
        if (result.acknowledged && result.modifiedCount === 1) {
            const base = (process.env.SHARE_BASE_URL || '').replace(/\/$/, '');
            return new Response_modal_1.SuccessModal({
                shareEnabled: !!shareEnabled,
                shareToken: shareEnabled ? shareToken : '',
                shareUrl: shareEnabled
                    ? `${base}/share/${shareToken}`
                    : '',
                expireAt,
            }, shareEnabled ? '分享已开启' : '分享已关闭');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应笔记或无权限');
        }
        return new Response_modal_1.ErrorModal(result, '更新失败');
    }
    async getSharedNote(param, req) {
        const note = await this.ispeakService.findByShareToken(param.token);
        if (!note) {
            return new Response_modal_1.ErrorModal(null, '分享链接无效或已过期');
        }
        await this.ispeakService.incCounter(note._id, 'shareCount', 1);
        const device = (0, device_1.extractDevice)(req);
        return new Response_modal_1.SuccessModal({
            _id: note._id,
            title: note.title,
            content: note.content,
            contentFormat: note.contentFormat,
            attachments: note.attachments,
            location: note.location,
            theme: note.theme,
            cover: note.cover,
            mdc: note.mdc,
            author: note.author,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            device,
            deviceLabel: (0, device_1.formatDevice)(device),
        });
    }
    async getTimeline(query, req) {
        const author = query.author || req.user?.userId;
        const groupBy = query.groupBy === 'month' ? 'month' : 'day';
        const result = await this.ispeakService.getTimeline(Number(query.page) || 1, Number(query.pageSize) || 20, groupBy, {
            author,
            requesterId: req.user?.userId,
            tags: query.tags ? String(query.tags).split(',') : undefined,
            tag: query.tag,
        });
        result.groups.forEach((group) => {
            group.items = group.items.map((item) => {
                item.author = item.author
                    ? { nickName: item.author[0]?.nickName, avatar: item.author[0]?.avatar }
                    : { nickName: '', avatar: '' };
                item.tag = item.tag ? item.tag[0] : {};
                item.tags = Array.isArray(item.tags) ? item.tags : [];
                item.deviceLabel = item.device ? (0, device_1.formatDevice)(item.device) : '';
                return this.maskItem(item, req);
            });
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async getCalendar(query, req) {
        const author = query.author || req.user?.userId;
        const year = Number(query.year) || new Date().getFullYear();
        const month = query.month ? Number(query.month) : undefined;
        const result = await this.ispeakService.getCalendar(year, month, {
            author,
            requesterId: req.user?.userId,
            tags: query.tags ? String(query.tags).split(',') : undefined,
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async getMap(query, req) {
        const author = query.author || req.user?.userId;
        const result = await this.ispeakService.getMapPoints({
            author,
            requesterId: req.user?.userId,
            tags: query.tags ? String(query.tags).split(',') : undefined,
        }, Number(query.limit) || 500);
        return new Response_modal_1.SuccessModal(result);
    }
    async search(query, req) {
        const keyword = (query.keyword || query.q || '').trim();
        if (!keyword) {
            return new Response_modal_1.ErrorModal(null, '请输入搜索关键词');
        }
        const author = query.author || req.user?.userId;
        const searchMode = query.mode === 'regex' ? 'regex' : 'text';
        const result = await this.ispeakService.getSpeakByPage(Number(query.page) || 1, Number(query.pageSize) || 20, {
            author,
            requesterId: req.user?.userId,
            keyword,
            searchMode,
            tags: query.tags ? String(query.tags).split(',') : undefined,
            tag: query.tag,
        });
        const returnObj = { total: 0, items: [], keyword, mode: searchMode };
        result.forEach((res) => {
            returnObj.total = res.total ? res.total[0]?.total : 0;
            res.items.forEach((item) => {
                item.author = item.author
                    ? { nickName: item.author[0]?.nickName, avatar: item.author[0]?.avatar }
                    : { nickName: '', avatar: '' };
                item.tag = item.tag ? item.tag[0] : {};
                item.tags = Array.isArray(item.tags) ? item.tags : [];
                item.deviceLabel = item.device ? (0, device_1.formatDevice)(item.device) : '';
                returnObj.items.push(this.maskItem(item, req));
            });
        });
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async getArchived(query, req) {
        const author = query.author || req.user?.userId;
        const result = await this.ispeakService.getArchivedList(author, Number(query.page) || 1, Number(query.pageSize) || 20);
        const returnObj = { total: 0, items: [] };
        result.forEach((res) => {
            returnObj.total = res.total ? res.total[0]?.total : 0;
            res.items.forEach((item) => {
                item.author = item.author
                    ? { nickName: item.author[0]?.nickName, avatar: item.author[0]?.avatar }
                    : { nickName: '', avatar: '' };
                item.tag = item.tag ? item.tag[0] : {};
                item.tags = Array.isArray(item.tags) ? item.tags : [];
                returnObj.items.push(item);
            });
        });
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async archive(body, req) {
        const { _id } = body;
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        const result = await this.ispeakService.archiveNote(_id, req.user.userId);
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '归档成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应笔记或无权限');
        }
        return new Response_modal_1.ErrorModal(result, '归档失败');
    }
    async restore(body, req) {
        const { _id } = body;
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        }
        const result = await this.ispeakService.restoreNote(_id, req.user.userId);
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '恢复成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应笔记或无权限');
        }
        return new Response_modal_1.ErrorModal(result, '恢复失败');
    }
    async getStats(req) {
        const result = await this.ispeakService.getStats(req.user.userId);
        return new Response_modal_1.SuccessModal(result);
    }
    buildNotePayload(body, author, req = null, extra = {}) {
        const { title = '', content = '', contentFormat = constant_1.ContentFormat.MARKDOWN, type, tag, tags = [], visibility, requireLogin = false, mdc, attachments = [], location, theme = 'default', cover = '', pinned = false, showComment = '1', status = constant_1.NoteStatus.PUBLISHED, } = body;
        const tagIds = [];
        if (Array.isArray(tags)) {
            tags.filter((t) => t && (0, mongoose_1.isValidObjectId)(t)).forEach((t) => tagIds.push(t));
        }
        if (tag && (0, mongoose_1.isValidObjectId)(tag) && !tagIds.includes(tag)) {
            tagIds.push(tag);
        }
        let finalVisibility = visibility;
        if (!finalVisibility) {
            if (type === constant_1.LegacyNoteType.PRIVATE)
                finalVisibility = constant_1.NoteVisibility.PRIVATE;
            else if (type === constant_1.LegacyNoteType.REQUIRE_LOGIN)
                finalVisibility = constant_1.NoteVisibility.PUBLIC;
            else
                finalVisibility = constant_1.NoteVisibility.PUBLIC;
        }
        const finalType = finalVisibility === constant_1.NoteVisibility.PRIVATE
            ? constant_1.LegacyNoteType.PRIVATE
            : requireLogin
                ? constant_1.LegacyNoteType.REQUIRE_LOGIN
                : constant_1.LegacyNoteType.PUBLIC;
        const device = req ? (0, device_1.extractDevice)(req) : null;
        return {
            title: title || '',
            content,
            contentFormat,
            type: finalType,
            visibility: finalVisibility,
            requireLogin: !!requireLogin,
            tag: tagIds.length ? tagIds[0] : null,
            tags: tagIds,
            mdc: mdc || { enabledComponents: [], componentOptions: {} },
            attachments: Array.isArray(attachments) ? attachments : [],
            location: location || null,
            status,
            theme,
            cover,
            pinned: !!pinned,
            showComment,
            publishedAt: status === constant_1.NoteStatus.PUBLISHED ? new Date() : null,
            device,
            author,
            ...extra,
        };
    }
    maskItem(item, req) {
        const requesterId = req?.user?.userId;
        const authorId = item.author?._id?.toString
            ? item.author._id.toString()
            : item.authorId?.toString?.() || item.authorId;
        const isOwner = requesterId && authorId && requesterId.toString() === authorId.toString();
        const isLogin = !!requesterId;
        if (!isOwner && item.visibility === constant_1.NoteVisibility.PRIVATE) {
            return {
                _id: item._id,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                author: item.author,
                type: constant_1.LegacyNoteType.PRIVATE,
                visibility: item.visibility,
                content: '该内容为私密内容',
                title: '',
                tags: [],
                attachments: [],
            };
        }
        if (!isOwner && item.requireLogin && !isLogin) {
            return {
                _id: item._id,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                author: item.author,
                type: constant_1.LegacyNoteType.REQUIRE_LOGIN,
                visibility: item.visibility,
                content: '该内容需登录后查看',
                title: '',
                tags: [],
                attachments: [],
            };
        }
        return item;
    }
};
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getSpeakByPage", null);
__decorate([
    (0, common_1.Get)('/getByPage'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getIspeakByPage", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "addOneSpeak", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Post)('/addByToken'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "addOneSpeakByToken", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateSpeak", null);
__decorate([
    (0, common_1.Patch)('/status/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateSpeakStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "deleteOneSpeak", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getOneSpeak", null);
__decorate([
    (0, common_1.Patch)('/visibility'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateVisibility", null);
__decorate([
    (0, common_1.Patch)('/share'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateShare", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('/share/:token'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getSharedNote", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/timeline'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getTimeline", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/calendar'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getCalendar", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/map'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getMap", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "search", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/archived'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getArchived", null);
__decorate([
    (0, common_1.Patch)('/archive'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "archive", null);
__decorate([
    (0, common_1.Patch)('/restore'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "restore", null);
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getStats", null);
IspeakController = __decorate([
    (0, common_1.Controller)('/ispeak'),
    __metadata("design:paramtypes", [ispeak_service_1.IspeakService,
        token_service_1.TokenService])
], IspeakController);
exports.IspeakController = IspeakController;
//# sourceMappingURL=ispeak.controller.js.map