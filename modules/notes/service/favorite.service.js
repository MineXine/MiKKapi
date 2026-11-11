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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let FavoriteService = class FavoriteService {
    constructor(favoriteModel) {
        this.favoriteModel = favoriteModel;
    }
    async favorite(noteId, userId, folder = '', remark = '', device = null) {
        const existing = await this.favoriteModel
            .findOne({ user: userId, note: noteId })
            .exec();
        if (existing) {
            existing.folder = folder ?? existing.folder;
            existing.remark = remark ?? existing.remark;
            await existing.save();
            return { favorited: true, created: false, record: existing };
        }
        const record = await this.favoriteModel.create({
            user: userId,
            note: noteId,
            folder,
            remark,
            device,
        });
        return { favorited: true, created: true, record };
    }
    async unfavorite(noteId, userId) {
        const res = await this.favoriteModel
            .findOneAndDelete({ user: userId, note: noteId })
            .exec();
        return { favorited: false, removed: !!res };
    }
    async isFavorited(noteId, userId) {
        if (!userId)
            return false;
        const count = await this.favoriteModel
            .countDocuments({ user: userId, note: noteId })
            .exec();
        return count > 0;
    }
    async list(userId, options = {}) {
        const page = options.page || 1;
        const limit = options.limit || 20;
        const skip = (Math.max(page, 1) - 1) * limit;
        const filter = { user: userId };
        if (options.folder !== undefined) {
            filter.folder = options.folder;
        }
        const [items, total] = await Promise.all([
            this.favoriteModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.favoriteModel.countDocuments(filter).exec(),
        ]);
        return { total, items };
    }
    async folders(userId) {
        const rows = await this.favoriteModel
            .aggregate([
            { $match: { user: new mongoose_2.Types.ObjectId(userId) } },
            { $group: { _id: '$folder', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ])
            .exec();
        return rows.map((r) => ({ folder: r._id || '', count: r.count }));
    }
    async countByNote(noteId) {
        return this.favoriteModel.countDocuments({ note: noteId }).exec();
    }
};
FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Favorite)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=favorite.service.js.map