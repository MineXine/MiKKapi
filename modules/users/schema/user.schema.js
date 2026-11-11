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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.UserPreferenceSchema = exports.UserPreference = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const constant_1 = require("../../../common/constant");
let UserPreference = class UserPreference {
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'default' }),
    __metadata("design:type", String)
], UserPreference.prototype, "editorTheme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: constant_1.ThemeMode.AUTO }),
    __metadata("design:type", String)
], UserPreference.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'day' }),
    __metadata("design:type", String)
], UserPreference.prototype, "timelineGroupBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], UserPreference.prototype, "calendarStartDay", void 0);
UserPreference = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UserPreference);
exports.UserPreference = UserPreference;
exports.UserPreferenceSchema = mongoose_1.SchemaFactory.createForClass(UserPreference);
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "desc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
        default: '$2a$10$TVk79hQVVpmfu2BOupaIl.lw80Wlwvnpwl0oOjjLH180fi16F9p0K',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '/about/index' }),
    __metadata("design:type", String)
], User.prototype, "homePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '0' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '', type: String }),
    __metadata("design:type", String)
], User.prototype, "speakToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "githubId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '', type: String }),
    __metadata("design:type", String)
], User.prototype, "activeTheme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.UserPreferenceSchema, default: () => ({}) }),
    __metadata("design:type", UserPreference)
], User.prototype, "preference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], User.prototype, "lastDevice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map