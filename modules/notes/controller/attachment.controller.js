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
exports.AttachmentController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Response_modal_1 = require("../../../Model/Response.modal");
const attachment_service_1 = require("../service/attachment.service");
const device_1 = require("../../../common/device");
let AttachmentController = class AttachmentController {
    constructor(attachmentService) {
        this.attachmentService = attachmentService;
    }
    async upload(body, req) {
        const { filename, mime, data, url, size, width, height, duration, noteId } = body;
        if (!filename) {
            return new Response_modal_1.ErrorModal(null, '文件名不能为空');
        }
        if (!data && !url) {
            return new Response_modal_1.ErrorModal(null, '请提供 data（base64）或 url');
        }
        if (noteId && !(0, mongoose_1.isValidObjectId)(noteId)) {
            return new Response_modal_1.ErrorModal(null, 'noteId 不合法');
        }
        const device = (0, device_1.extractDevice)(req);
        try {
            const record = await this.attachmentService.upload(req.user.userId, {
                filename,
                mime,
                data,
                url,
                size,
                width,
                height,
                duration,
                noteId,
                device,
            });
            return new Response_modal_1.SuccessModal(record, '附件上传成功');
        }
        catch (err) {
            return new Response_modal_1.ErrorModal(null, err?.message || '附件上传失败');
        }
    }
    async list(query, req) {
        const result = await this.attachmentService.list(req.user.userId, {
            noteId: query.noteId,
            kind: query.kind,
            page: Number(query.page) || 1,
            limit: Number(query.pageSize) || 20,
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async bind(body, req) {
        const { ids, noteId } = body;
        if (!(0, mongoose_1.isValidObjectId)(noteId)) {
            return new Response_modal_1.ErrorModal(null, 'noteId 不合法');
        }
        if (!Array.isArray(ids) || !ids.length) {
            return new Response_modal_1.ErrorModal(null, 'ids 不能为空');
        }
        const refs = await this.attachmentService.bindToNote(ids, noteId, req.user.userId);
        return new Response_modal_1.SuccessModal(refs, '附件已关联');
    }
    async remove(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const res = await this.attachmentService.remove(param.id, req.user.userId);
        if (!res) {
            return new Response_modal_1.ErrorModal(null, '附件不存在或无权限');
        }
        return new Response_modal_1.SuccessModal(res, '附件已删除');
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/bind'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "bind", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "remove", null);
AttachmentController = __decorate([
    (0, common_1.Controller)('/note/attachment'),
    __metadata("design:paramtypes", [attachment_service_1.AttachmentService])
], AttachmentController);
exports.AttachmentController = AttachmentController;
//# sourceMappingURL=attachment.controller.js.map