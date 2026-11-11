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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeSchema = exports.Theme = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
let Theme = class Theme {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: model_name_1.UserModelName.User,
        required: true,
    }),
    __metadata("design:type", Object)
], Theme.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Theme.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'default' }),
    __metadata("design:type", String)
], Theme.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: constant_1.ThemeMode.LIGHT, enum: Object.values(constant_1.ThemeMode) }),
    __metadata("design:type", String)
], Theme.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Theme.prototype, "tokens", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#DB2828' }),
    __metadata("design:type", String)
], Theme.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Theme.prototype, "followSystem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Theme.prototype, "builtin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Theme.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Theme.prototype, "updatedAt", void 0);
Theme = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Theme);
exports.Theme = Theme;
exports.ThemeSchema = mongoose_1.SchemaFactory.createForClass(Theme);
exports.ThemeSchema.index({ user: 1, key: 1 }, { unique: true });
exports.ThemeSchema.index({ user: 1, name: 1 });
//# sourceMappingURL=theme.schema.js.map