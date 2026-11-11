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
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
let ShareService = class ShareService {
    constructor(shareModel) {
        this.shareModel = shareModel;
    }
    async record(options) {
        return this.shareModel.create({
            note: options.noteId || null,
            user: options.userId || null,
            shareToken: options.shareToken || '',
            channel: options.channel || constant_1.ShareChannel.LINK,
            device: options.device || null,
            ip: options.ip || '',
            isOwner: !!options.isOwner,
        });
    }
    async stats(noteId) {
        const rows = await this.shareModel
            .aggregate([
            { $match: { note: new mongoose_2.Types.ObjectId(noteId) } },
            { $group: { _id: '$channel', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ])
            .exec();
        const total = rows.reduce((sum, r) => sum + r.count, 0);
        return {
            total,
            byChannel: rows.map((r) => ({ channel: r._id, count: r.count })),
        };
    }
    async listByNote(noteId, page = 1, limit = 20) {
        const skip = (Math.max(page, 1) - 1) * limit;
        const [items, total] = await Promise.all([
            this.shareModel
                .find({ note: noteId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.shareModel.countDocuments({ note: noteId }).exec(),
        ]);
        return { total, items };
    }
};
ShareService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Share)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=share.service.js.map