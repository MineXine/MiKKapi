"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageDriver = exports.ThemeMode = exports.DeviceType = exports.ShareChannel = exports.ViewSort = exports.ViewType = exports.AttachmentKind = exports.ContentFormat = exports.LegacyNoteType = exports.NoteStatus = exports.NoteVisibility = void 0;
var NoteVisibility;
(function (NoteVisibility) {
    NoteVisibility["PUBLIC"] = "public";
    NoteVisibility["PRIVATE"] = "private";
})(NoteVisibility = exports.NoteVisibility || (exports.NoteVisibility = {}));
var NoteStatus;
(function (NoteStatus) {
    NoteStatus["DRAFT"] = "draft";
    NoteStatus["PUBLISHED"] = "published";
    NoteStatus["ARCHIVED"] = "archived";
})(NoteStatus = exports.NoteStatus || (exports.NoteStatus = {}));
var LegacyNoteType;
(function (LegacyNoteType) {
    LegacyNoteType["PUBLIC"] = "0";
    LegacyNoteType["REQUIRE_LOGIN"] = "1";
    LegacyNoteType["PRIVATE"] = "2";
})(LegacyNoteType = exports.LegacyNoteType || (exports.LegacyNoteType = {}));
var ContentFormat;
(function (ContentFormat) {
    ContentFormat["MARKDOWN"] = "markdown";
    ContentFormat["HTML"] = "html";
    ContentFormat["PLAIN"] = "plain";
})(ContentFormat = exports.ContentFormat || (exports.ContentFormat = {}));
var AttachmentKind;
(function (AttachmentKind) {
    AttachmentKind["IMAGE"] = "image";
    AttachmentKind["VIDEO"] = "video";
    AttachmentKind["AUDIO"] = "audio";
    AttachmentKind["FILE"] = "file";
})(AttachmentKind = exports.AttachmentKind || (exports.AttachmentKind = {}));
var ViewType;
(function (ViewType) {
    ViewType["TIMELINE"] = "timeline";
    ViewType["TAG"] = "tag";
    ViewType["SEARCH"] = "search";
    ViewType["CALENDAR"] = "calendar";
    ViewType["MAP"] = "map";
    ViewType["GALLERY"] = "gallery";
    ViewType["CUSTOM"] = "custom";
})(ViewType = exports.ViewType || (exports.ViewType = {}));
var ViewSort;
(function (ViewSort) {
    ViewSort["CREATED_DESC"] = "created_desc";
    ViewSort["CREATED_ASC"] = "created_asc";
    ViewSort["UPDATED_DESC"] = "updated_desc";
    ViewSort["UPDATED_ASC"] = "updated_asc";
    ViewSort["LIKE_DESC"] = "like_desc";
    ViewSort["TITLE_ASC"] = "title_asc";
})(ViewSort = exports.ViewSort || (exports.ViewSort = {}));
var ShareChannel;
(function (ShareChannel) {
    ShareChannel["LINK"] = "link";
    ShareChannel["COPY"] = "copy";
    ShareChannel["WECHAT"] = "wechat";
    ShareChannel["WEIBO"] = "weibo";
    ShareChannel["QQ"] = "qq";
    ShareChannel["TELEGRAM"] = "telegram";
    ShareChannel["EMAIL"] = "email";
    ShareChannel["QRCODE"] = "qrcode";
})(ShareChannel = exports.ShareChannel || (exports.ShareChannel = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["DESKTOP"] = "desktop";
    DeviceType["MOBILE"] = "mobile";
    DeviceType["TABLET"] = "tablet";
    DeviceType["BOT"] = "bot";
    DeviceType["TV"] = "tv";
    DeviceType["WEARABLE"] = "wearable";
    DeviceType["UNKNOWN"] = "unknown";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
var ThemeMode;
(function (ThemeMode) {
    ThemeMode["LIGHT"] = "light";
    ThemeMode["DARK"] = "dark";
    ThemeMode["AUTO"] = "auto";
    ThemeMode["SEPIA"] = "sepia";
    ThemeMode["CUSTOM"] = "custom";
})(ThemeMode = exports.ThemeMode || (exports.ThemeMode = {}));
var StorageDriver;
(function (StorageDriver) {
    StorageDriver["BASE64"] = "base64";
    StorageDriver["LOCAL"] = "local";
    StorageDriver["URL"] = "url";
})(StorageDriver = exports.StorageDriver || (exports.StorageDriver = {}));
//# sourceMappingURL=constant.js.map