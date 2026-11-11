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
exports.DraftController = void 0;
const common_1 = require("@nestjs/common");
const Response_modal_1 = require("../../../Model/Response.modal");
const draft_service_1 = require("../service/draft.service");
const device_1 = require("../../../common/device");
let DraftController = class DraftController {
    constructor(draftService) {
        this.draftService = draftService;
    }
    async autosave(body, req) {
        const { draftKey } = body;
        if (!draftKey) {
            return new Response_modal_1.ErrorModal(null, 'draftKey 不能为空');
        }
        const device = (0, device_1.extractDevice)(req);
        const draft = await this.draftService.autosave(req.user.userId, draftKey, {
            title: body.title,
            content: body.content,
            tags: body.tags,
            mdc: body.mdc,
            attachments: body.attachments,
            location: body.location,
            theme: body.theme,
            note: body.note,
            device,
        });
        return new Response_modal_1.SuccessModal({
            draftKey: draft.draftKey,
            autosavedAt: draft.autosavedAt,
            autosaveCount: draft.autosaveCount,
            deviceLabel: (0, device_1.formatDevice)(device),
        }, '草稿已保存');
    }
    async list(query, req) {
        const result = await this.draftService.list(req.user.userId, Number(query.page) || 1, Number(query.pageSize) || 20);
        result.items = result.items.map((item) => ({
            ...(item.toObject ? item.toObject() : item),
            deviceLabel: item.device ? (0, device_1.formatDevice)(item.device) : '',
        }));
        return new Response_modal_1.SuccessModal(result);
    }
    async findOne(param, req) {
        const draft = await this.draftService.findOne(req.user.userId, param.draftKey);
        if (!draft) {
            return new Response_modal_1.ErrorModal(null, '草稿不存在');
        }
        return new Response_modal_1.SuccessModal(draft);
    }
    async remove(param, req) {
        const res = await this.draftService.remove(req.user.userId, param.draftKey);
        return new Response_modal_1.SuccessModal(res);
    }
    async purge(body, req) {
        const days = Number(body.days) || 30;
        const count = await this.draftService.purge(req.user.userId, days);
        return new Response_modal_1.SuccessModal({ purged: count }, '旧草稿已清理');
    }
};
__decorate([
    (0, common_1.Post)('/autosave'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "autosave", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:draftKey'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('/:draftKey'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/purge'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DraftController.prototype, "purge", null);
DraftController = __decorate([
    (0, common_1.Controller)('/note/draft'),
    __metadata("design:paramtypes", [draft_service_1.DraftService])
], DraftController);
exports.DraftController = DraftController;
//# sourceMappingURL=draft.controller.js.map