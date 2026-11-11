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
exports.IndexBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let IndexBootstrapService = class IndexBootstrapService {
    constructor(ispeakModel) {
        this.ispeakModel = ispeakModel;
    }
    async onApplicationBootstrap() {
        const enabled = (process.env.AUTO_CREATE_TEXT_INDEX || 'true') !== 'false';
        if (!enabled) {
            common_1.Logger.log('已跳过全文索引自动创建（AUTO_CREATE_TEXT_INDEX=false）');
            return;
        }
        try {
            try {
                await this.ispeakModel.createCollection();
            }
            catch (collectionErr) {
            }
            const indexes = await this.ispeakModel.collection.indexes();
            const exists = indexes.some((idx) => idx.name === 'ispeak_text_index');
            if (exists) {
                common_1.Logger.log('全文索引已存在，跳过创建');
                return;
            }
            await this.ispeakModel.collection.createIndex({ title: 'text', content: 'text' }, {
                name: 'ispeak_text_index',
                weights: { title: 10, content: 5 },
                default_language: 'none',
            });
            common_1.Logger.log('全文索引 ispeak_text_index 创建成功');
        }
        catch (err) {
            common_1.Logger.error(`全文索引创建失败：${err?.message}`, 'IndexBootstrap');
        }
    }
};
IndexBootstrapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.ISpeakModelName.ISpeakList)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IndexBootstrapService);
exports.IndexBootstrapService = IndexBootstrapService;
//# sourceMappingURL=index-bootstrap.service.js.map