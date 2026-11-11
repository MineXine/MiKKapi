"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
['local.env', '.env'].forEach((file) => {
    const target = path_1.default.resolve(process.cwd(), file);
    if (fs_1.default.existsSync(target)) {
        dotenv_1.default.config({ path: target });
    }
});
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/users/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const ispeak_module_1 = require("./modules/ispeak/ispeak.module");
const openApi_module_1 = require("./modules/openApi/openApi.module");
const notes_module_1 = require("./modules/notes/notes.module");
const post_module_1 = require("./modules/friendCircle/module/post.module");
const controllers = [app_controller_1.AppController];
const providers = [app_service_1.AppService];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            ispeak_module_1.IspeakModule,
            notes_module_1.NotesModule,
            openApi_module_1.OpenApiModule,
            post_module_1.PostModule,
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL, {
                user: process.env.DATABASE_USER,
                pass: process.env.DATABASE_PASSWORD,
            }),
        ],
        controllers,
        providers,
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map