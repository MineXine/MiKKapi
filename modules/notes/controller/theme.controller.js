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
exports.ThemeController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Response_modal_1 = require("../../../Model/Response.modal");
const theme_service_1 = require("../service/theme.service");
const user_service_1 = require("../../users/services/user.service");
let ThemeController = class ThemeController {
    constructor(themeService, userService) {
        this.themeService = themeService;
        this.userService = userService;
    }
    async list(req) {
        await this.themeService.ensureBuiltinThemes(req.user.userId);
        const themes = await this.themeService.list(req.user.userId);
        const user = await this.userService.findOne({ _id: req.user.userId });
        return new Response_modal_1.SuccessModal({
            themes,
            activeTheme: user?.activeTheme || 'default',
        });
    }
    async create(body, req) {
        if (!body.name) {
            return new Response_modal_1.ErrorModal(null, '主题名称不能为空');
        }
        try {
            const theme = await this.themeService.create(req.user.userId, body);
            return new Response_modal_1.SuccessModal(theme, '主题创建成功');
        }
        catch (err) {
            return new Response_modal_1.ErrorModal(null, err?.message || '创建失败');
        }
    }
    async activate(body, req) {
        let key = body.key;
        if (!key && body.id) {
            if (!(0, mongoose_1.isValidObjectId)(body.id)) {
                return new Response_modal_1.ErrorModal(null, 'id 不合法');
            }
            const theme = await this.themeService.findOne(req.user.userId, body.id);
            if (!theme) {
                return new Response_modal_1.ErrorModal(null, '主题不存在');
            }
            key = theme.key;
        }
        if (!key) {
            return new Response_modal_1.ErrorModal(null, '请提供 id 或 key');
        }
        await this.userService.updateOne({ _id: req.user.userId }, { $set: { activeTheme: key } });
        return new Response_modal_1.SuccessModal({ activeTheme: key }, '主题已切换');
    }
    async update(param, body, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const result = await this.themeService.update(req.user.userId, param.id, body);
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '主题更新成功');
        }
        if (result.matchedCount === 0) {
            return new Response_modal_1.ErrorModal(result, '没有找到对应主题');
        }
        return new Response_modal_1.ErrorModal(result, '更新失败');
    }
    async remove(param, req) {
        if (!(0, mongoose_1.isValidObjectId)(param.id)) {
            return new Response_modal_1.ErrorModal(null, 'id 不合法');
        }
        const res = await this.themeService.remove(req.user.userId, param.id);
        if (!res) {
            return new Response_modal_1.ErrorModal(null, '主题不存在或无权限');
        }
        return new Response_modal_1.SuccessModal(res, '主题已删除');
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/active'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "remove", null);
ThemeController = __decorate([
    (0, common_1.Controller)('/note/theme'),
    __metadata("design:paramtypes", [theme_service_1.ThemeService,
        user_service_1.UserService])
], ThemeController);
exports.ThemeController = ThemeController;
//# sourceMappingURL=theme.controller.js.map