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
exports.MdcController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const customize_1 = require("../../../common/decorator/customize");
const Response_modal_1 = require("../../../Model/Response.modal");
const mdc_service_1 = require("../service/mdc.service");
let MdcController = class MdcController {
    constructor(mdcService) {
        this.mdcService = mdcService;
    }
    async list(req) {
        const rows = await this.mdcService.list(req.user?.userId);
        return new Response_modal_1.SuccessModal(rows.map((row) => ({
            ...row,
            device: undefined,
        })));
    }
    async upsert(body, req) {
        const { name, props } = body;
        if (!name) {
            return new Response_modal_1.ErrorModal(null, '组件名不能为空');
        }
        if (props && !Array.isArray(props)) {
            return new Response_modal_1.ErrorModal(null, 'props 必须是数组');
        }
        if (props?.length) {
            const invalid = props.find((p) => !p.key);
            if (invalid) {
                return new Response_modal_1.ErrorModal(null, '每个选项都必须包含 key');
            }
        }
        try {
            const record = await this.mdcService.upsert(req.user.userId, body);
            return new Response_modal_1.SuccessModal(record, '组件已保存');
        }
        catch (err) {
            return new Response_modal_1.ErrorModal(null, err?.message || '保存失败');
        }
    }
    async remove(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const res = await this.mdcService.remove(req.user.userId, param.id);
        if (!res) {
            return new Response_modal_1.ErrorModal(null, '组件不存在或无权限');
        }
        return new Response_modal_1.SuccessModal(res, '组件已删除');
    }
    async render(body, req) {
        const content = body.content || '';
        const result = await this.mdcService.render(content, req.user?.userId, body.mdc);
        return new Response_modal_1.SuccessModal(result);
    }
    async preview(body) {
        const content = body.content || '';
        const result = await this.mdcService.render(content, undefined, body.mdc);
        return new Response_modal_1.SuccessModal(result);
    }
};
__decorate([
    (0, common_1.Get)('/components'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MdcController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/components'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MdcController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)('/components/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MdcController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/render'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MdcController.prototype, "render", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Post)('/preview'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MdcController.prototype, "preview", null);
MdcController = __decorate([
    (0, common_1.Controller)('/note/mdc'),
    __metadata("design:paramtypes", [mdc_service_1.MdcService])
], MdcController);
exports.MdcController = MdcController;
//# sourceMappingURL=mdc.controller.js.map