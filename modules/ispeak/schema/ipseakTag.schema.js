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
exports.IspeakTagSchema = exports.IspeakTag = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = __importStar(require("mongoose"));
const model_name_1 = require("../../../constant/model-name");
let IspeakTag = class IspeakTag {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '标签名称为必填项' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IspeakTag.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#DB2828' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#DB2828' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "textColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: model_name_1.UserModelName.User,
        default: null,
    }),
    __metadata("design:type", Object)
], IspeakTag.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], IspeakTag.prototype, "orderNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], IspeakTag.prototype, "noteCount", void 0);
IspeakTag = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], IspeakTag);
exports.IspeakTag = IspeakTag;
exports.IspeakTagSchema = mongoose_1.SchemaFactory.createForClass(IspeakTag);
exports.IspeakTagSchema.index({ user: 1, name: 1 });
exports.IspeakTagSchema.index({ user: 1, orderNo: 1 });
exports.IspeakTagSchema.index({ name: 'text' });
//# sourceMappingURL=ipseakTag.schema.js.map