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
exports.ViewController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Response_modal_1 = require("../../../Model/Response.modal");
const view_service_1 = require("../service/view.service");
let ViewController = class ViewController {
    constructor(viewService) {
        this.viewService = viewService;
    }
    async list(req) {
        await this.viewService.ensureBuiltinViews(req.user.userId);
        const views = await this.viewService.list(req.user.userId);
        return new Response_modal_1.SuccessModal(views);
    }
    async create(body, req) {
        if (!body.name) {
            return new Response_modal_1.ErrorModal(null, '视图名称不能为空');
        }
        const view = await this.viewService.create(req.user.userId, body);
        return new Response_modal_1.SuccessModal(view, '视图创建成功');
    }
    async update(param, body, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const result = await this.viewService.update(req.user.userId, param.id, body);
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '视图更新成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应视图');
        }
        return new Response_modal_1.ErrorModal(result, '更新失败');
    }
    async remove(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const res = await this.viewService.remove(req.user.userId, param.id);
        if (!res) {
            return new Response_modal_1.ErrorModal(null, '视图不存在或为内置视图');
        }
        return new Response_modal_1.SuccessModal(res, '视图已删除');
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "remove", null);
ViewController = __decorate([
    (0, common_1.Controller)('/note/view'),
    __metadata("design:paramtypes", [view_service_1.ViewService])
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=view.controller.js.map