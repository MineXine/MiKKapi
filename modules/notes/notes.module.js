"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const model_name_1 = require("../../constant/model-name");
const user_module_1 = require("../users/user.module");
const ispeak_module_1 = require("../ispeak/ispeak.module");
const attachment_schema_1 = require("./schema/attachment.schema");
const draft_schema_1 = require("./schema/draft.schema");
const favorite_schema_1 = require("./schema/favorite.schema");
const like_schema_1 = require("./schema/like.schema");
const mdc_component_schema_1 = require("./schema/mdc-component.schema");
const share_schema_1 = require("./schema/share.schema");
const theme_schema_1 = require("./schema/theme.schema");
const view_schema_1 = require("./schema/view.schema");
const attachment_service_1 = require("./service/attachment.service");
const draft_service_1 = require("./service/draft.service");
const favorite_service_1 = require("./service/favorite.service");
const like_service_1 = require("./service/like.service");
const mdc_service_1 = require("./service/mdc.service");
const share_service_1 = require("./service/share.service");
const theme_service_1 = require("./service/theme.service");
const view_service_1 = require("./service/view.service");
const attachment_controller_1 = require("./controller/attachment.controller");
const device_controller_1 = require("./controller/device.controller");
const draft_controller_1 = require("./controller/draft.controller");
const interaction_controller_1 = require("./controller/interaction.controller");
const mdc_controller_1 = require("./controller/mdc.controller");
const theme_controller_1 = require("./controller/theme.controller");
const view_controller_1 = require("./controller/view.controller");
let NotesModule = class NotesModule {
};
NotesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => ispeak_module_1.IspeakModule),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: model_name_1.NoteModelName.Attachment,
                    schema: attachment_schema_1.AttachmentSchema,
                    collection: model_name_1.NoteModelName.Attachment,
                },
                {
                    name: model_name_1.NoteModelName.Draft,
                    schema: draft_schema_1.DraftSchema,
                    collection: model_name_1.NoteModelName.Draft,
                },
                {
                    name: model_name_1.NoteModelName.Like,
                    schema: like_schema_1.LikeSchema,
                    collection: model_name_1.NoteModelName.Like,
                },
                {
                    name: model_name_1.NoteModelName.Favorite,
                    schema: favorite_schema_1.FavoriteSchema,
                    collection: model_name_1.NoteModelName.Favorite,
                },
                {
                    name: model_name_1.NoteModelName.Share,
                    schema: share_schema_1.ShareSchema,
                    collection: model_name_1.NoteModelName.Share,
                },
                {
                    name: model_name_1.NoteModelName.View,
                    schema: view_schema_1.ViewSchema,
                    collection: model_name_1.NoteModelName.View,
                },
                {
                    name: model_name_1.NoteModelName.MdcComponent,
                    schema: mdc_component_schema_1.MdcComponentSchema,
                    collection: model_name_1.NoteModelName.MdcComponent,
                },
                {
                    name: model_name_1.NoteModelName.Theme,
                    schema: theme_schema_1.ThemeSchema,
                    collection: model_name_1.NoteModelName.Theme,
                },
            ]),
        ],
        controllers: [
            interaction_controller_1.InteractionController,
            draft_controller_1.DraftController,
            attachment_controller_1.AttachmentController,
            view_controller_1.ViewController,
            mdc_controller_1.MdcController,
            theme_controller_1.ThemeController,
            device_controller_1.DeviceController,
        ],
        providers: [
            like_service_1.LikeService,
            favorite_service_1.FavoriteService,
            share_service_1.ShareService,
            draft_service_1.DraftService,
            attachment_service_1.AttachmentService,
            view_service_1.ViewService,
            mdc_service_1.MdcService,
            theme_service_1.ThemeService,
        ],
        exports: [
            like_service_1.LikeService,
            favorite_service_1.FavoriteService,
            share_service_1.ShareService,
            draft_service_1.DraftService,
            attachment_service_1.AttachmentService,
            view_service_1.ViewService,
            mdc_service_1.MdcService,
            theme_service_1.ThemeService,
        ],
    })
], NotesModule);
exports.NotesModule = NotesModule;
//# sourceMappingURL=notes.module.js.map