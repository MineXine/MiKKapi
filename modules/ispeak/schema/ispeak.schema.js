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
exports.IspeakSchema = exports.Ispeak = exports.NoteMdcConfigSchema = exports.NoteMdcConfig = exports.NoteAttachmentSchema = exports.NoteAttachment = exports.GeoPointSchema = exports.GeoPoint = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = __importStar(require("mongoose"));
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
let GeoPoint = class GeoPoint {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], GeoPoint.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], GeoPoint.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], GeoPoint.prototype, "lat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], GeoPoint.prototype, "lng", void 0);
GeoPoint = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], GeoPoint);
exports.GeoPoint = GeoPoint;
exports.GeoPointSchema = mongoose_1.SchemaFactory.createForClass(GeoPoint);
let NoteAttachment = class NoteAttachment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NoteAttachment.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NoteAttachment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NoteAttachment.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NoteAttachment.prototype, "mime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NoteAttachment.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'file' }),
    __metadata("design:type", String)
], NoteAttachment.prototype, "kind", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], NoteAttachment.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], NoteAttachment.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], NoteAttachment.prototype, "duration", void 0);
NoteAttachment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NoteAttachment);
exports.NoteAttachment = NoteAttachment;
exports.NoteAttachmentSchema = mongoose_1.SchemaFactory.createForClass(NoteAttachment);
let NoteMdcConfig = class NoteMdcConfig {
};
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], NoteMdcConfig.prototype, "enabledComponents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], NoteMdcConfig.prototype, "componentOptions", void 0);
NoteMdcConfig = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NoteMdcConfig);
exports.NoteMdcConfig = NoteMdcConfig;
exports.NoteMdcConfigSchema = mongoose_1.SchemaFactory.createForClass(NoteMdcConfig);
let Ispeak = class Ispeak {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Ispeak.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '内容为必填项目哦！' }),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Ispeak.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: constant_1.ContentFormat.MARKDOWN }),
    __metadata("design:type", String)
], Ispeak.prototype, "contentFormat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '0' }),
    __metadata("design:type", String)
], Ispeak.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: constant_1.NoteVisibility.PUBLIC, enum: Object.values(constant_1.NoteVisibility) }),
    __metadata("design:type", String)
], Ispeak.prototype, "visibility", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Ispeak.prototype, "requireLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: model_name_1.ISpeakModelName.ISpeakTagList,
        default: null,
    }),
    __metadata("design:type", Object)
], Ispeak.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose.Schema.Types.ObjectId],
        ref: model_name_1.ISpeakModelName.ISpeakTagList,
        default: [],
    }),
    __metadata("design:type", Array)
], Ispeak.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.NoteMdcConfigSchema, default: () => ({}) }),
    __metadata("design:type", NoteMdcConfig)
], Ispeak.prototype, "mdc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.NoteAttachmentSchema], default: [] }),
    __metadata("design:type", Array)
], Ispeak.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.GeoPointSchema, default: null }),
    __metadata("design:type", GeoPoint)
], Ispeak.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: constant_1.NoteStatus.PUBLISHED, enum: Object.values(constant_1.NoteStatus) }),
    __metadata("design:type", String)
], Ispeak.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Ispeak.prototype, "archivedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Ispeak.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'default' }),
    __metadata("design:type", String)
], Ispeak.prototype, "theme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Ispeak.prototype, "cover", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Ispeak.prototype, "pinned", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '1' }),
    __metadata("design:type", String)
], Ispeak.prototype, "showComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: model_name_1.UserModelName.User,
        required: true,
    }),
    __metadata("design:type", String)
], Ispeak.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Ispeak.prototype, "likeCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Ispeak.prototype, "favoriteCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Ispeak.prototype, "commentCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Ispeak.prototype, "viewCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Ispeak.prototype, "shareCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Ispeak.prototype, "shareToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Ispeak.prototype, "shareEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Ispeak.prototype, "shareExpireAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], Ispeak.prototype, "device", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Ispeak.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Ispeak.prototype, "createdAt", void 0);
Ispeak = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Ispeak);
exports.Ispeak = Ispeak;
exports.IspeakSchema = mongoose_1.SchemaFactory.createForClass(Ispeak);
exports.IspeakSchema.index({ title: 'text', content: 'text' }, {
    name: 'ispeak_text_index',
    weights: { title: 10, content: 5 },
    default_language: 'none',
});
exports.IspeakSchema.index({ author: 1, status: 1, createdAt: -1 });
exports.IspeakSchema.index({ tags: 1 });
exports.IspeakSchema.index({ visibility: 1, status: 1 });
exports.IspeakSchema.index({ 'location.lat': 1, 'location.lng': 1 });
exports.IspeakSchema.index({ shareToken: 1 }, { sparse: true, unique: true });
//# sourceMappingURL=ispeak.schema.js.map