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
exports.InteractionController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Response_modal_1 = require("../../../Model/Response.modal");
const like_service_1 = require("../service/like.service");
const favorite_service_1 = require("../service/favorite.service");
const share_service_1 = require("../service/share.service");
const ispeak_service_1 = require("../../ispeak/service/ispeak.service");
const device_1 = require("../../../common/device");
const constant_1 = require("../../../common/constant");
let InteractionController = class InteractionController {
    constructor(likeService, favoriteService, shareService, ispeakService) {
        this.likeService = likeService;
        this.favoriteService = favoriteService;
        this.shareService = shareService;
        this.ispeakService = ispeakService;
    }
    async like(body, req) {
        const { noteId } = body;
        if (!(0, mongoose_1.isValidObjectId)(noteId)) {
            return new Response_modal_1.ErrorModal(null, 'noteId 不合法');
        }
        const device = (0, device_1.extractDevice)(req);
        const result = await this.likeService.like(noteId, req.user.userId, device);
        if (result.created) {
            await this.ispeakService.incCounter(noteId, 'likeCount', 1);
        }
        return new Response_modal_1.SuccessModal({
            liked: true,
            likeCount: await this.likeService.countByNote(noteId),
            deviceLabel: (0, device_1.formatDevice)(device),
        }, result.created ? '点赞成功' : '已经点过赞啦');
    }
    async unlike(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const result = await this.likeService.unlike(param.id, req.user.userId);
        if (result.removed) {
            await this.ispeakService.incCounter(param.id, 'likeCount', -1);
        }
        return new Response_modal_1.SuccessModal({
            liked: false,
            likeCount: await this.likeService.countByNote(param.id),
        });
    }
    async myLikes(req) {
        const ids = await this.likeService.listNoteIdsByUser(req.user.userId);
        return new Response_modal_1.SuccessModal(ids);
    }
    async likeStatus(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const liked = await this.likeService.isLiked(param.id, req.user.userId);
        const list = await this.likeService.listByNote(param.id, Number(req.query?.page) || 1, Number(req.query?.pageSize) || 20);
        return new Response_modal_1.SuccessModal({
            liked,
            total: list.total,
            items: list.items,
        });
    }
    async favorite(body, req) {
        const { noteId, folder = '', remark = '' } = body;
        if (!(0, mongoose_1.isValidObjectId)(noteId)) {
            return new Response_modal_1.ErrorModal(null, 'noteId 不合法');
        }
        const device = (0, device_1.extractDevice)(req);
        const result = await this.favoriteService.favorite(noteId, req.user.userId, folder, remark, device);
        if (result.created) {
            await this.ispeakService.incCounter(noteId, 'favoriteCount', 1);
        }
        return new Response_modal_1.SuccessModal({
            favorited: true,
            favoriteCount: await this.favoriteService.countByNote(noteId),
        }, result.created ? '收藏成功' : '已在收藏夹中');
    }
    async unfavorite(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const result = await this.favoriteService.unfavorite(param.id, req.user.userId);
        if (result.removed) {
            await this.ispeakService.incCounter(param.id, 'favoriteCount', -1);
        }
        return new Response_modal_1.SuccessModal({
            favorited: false,
            favoriteCount: await this.favoriteService.countByNote(param.id),
        });
    }
    async favoriteList(query, req) {
        const result = await this.favoriteService.list(req.user.userId, {
            folder: query.folder,
            page: Number(query.page) || 1,
            limit: Number(query.pageSize) || 20,
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async favoriteFolders(req) {
        const folders = await this.favoriteService.folders(req.user.userId);
        return new Response_modal_1.SuccessModal(folders);
    }
    async share(body, req) {
        const { noteId, channel = constant_1.ShareChannel.LINK } = body;
        if (noteId && !(0, mongoose_1.isValidObjectId)(noteId)) {
            return new Response_modal_1.ErrorModal(null, 'noteId 不合法');
        }
        const device = (0, device_1.extractDevice)(req);
        const record = await this.shareService.record({
            noteId,
            userId: req.user.userId,
            shareToken: body.shareToken,
            channel,
            device,
            ip: device.ip,
            isOwner: true,
        });
        if (noteId) {
            await this.ispeakService.incCounter(noteId, 'shareCount', 1);
        }
        return new Response_modal_1.SuccessModal({
            channel,
            deviceLabel: (0, device_1.formatDevice)(device),
            recordId: record._id,
        });
    }
    async shareStats(param) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const stats = await this.shareService.stats(param.id);
        return new Response_modal_1.SuccessModal(stats);
    }
    async shareList(param, query) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const result = await this.shareService.listByNote(param.id, Number(query.page) || 1, Number(query.pageSize) || 20);
        result.items = result.items.map((item) => ({
            ...(item.toObject ? item.toObject() : item),
            deviceLabel: item.device ? (0, device_1.formatDevice)(item.device) : '',
        }));
        return new Response_modal_1.SuccessModal(result);
    }
};
__decorate([
    (0, common_1.Post)('/like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "like", null);
__decorate([
    (0, common_1.Delete)('/like/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "unlike", null);
__decorate([
    (0, common_1.Get)('/like/mine'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "myLikes", null);
__decorate([
    (0, common_1.Get)('/like/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "likeStatus", null);
__decorate([
    (0, common_1.Post)('/favorite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "favorite", null);
__decorate([
    (0, common_1.Delete)('/favorite/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "unfavorite", null);
__decorate([
    (0, common_1.Get)('/favorite'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "favoriteList", null);
__decorate([
    (0, common_1.Get)('/favorite/folders'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "favoriteFolders", null);
__decorate([
    (0, common_1.Post)('/share'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "share", null);
__decorate([
    (0, common_1.Get)('/share/stats/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "shareStats", null);
__decorate([
    (0, common_1.Get)('/share/list/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "shareList", null);
InteractionController = __decorate([
    (0, common_1.Controller)('/note'),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        favorite_service_1.FavoriteService,
        share_service_1.ShareService,
        ispeak_service_1.IspeakService])
], InteractionController);
exports.InteractionController = InteractionController;
//# sourceMappingURL=interaction.controller.js.map