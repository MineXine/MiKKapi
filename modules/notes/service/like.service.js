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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let LikeService = class LikeService {
    constructor(likeModel) {
        this.likeModel = likeModel;
    }
    async like(noteId, userId, device = null) {
        const existing = await this.likeModel
            .findOne({ user: userId, note: noteId })
            .exec();
        if (existing) {
            return { liked: true, created: false, record: existing };
        }
        try {
            const record = await this.likeModel.create({
                user: userId,
                note: noteId,
                device,
            });
            return { liked: true, created: true, record };
        }
        catch (err) {
            if (err?.code === 11000) {
                const record = await this.likeModel.findOne({ user: userId, note: noteId }).exec();
                return { liked: true, created: false, record };
            }
            throw err;
        }
    }
    async unlike(noteId, userId) {
        const res = await this.likeModel
            .findOneAndDelete({ user: userId, note: noteId })
            .exec();
        return { liked: false, removed: !!res };
    }
    async isLiked(noteId, userId) {
        if (!userId)
            return false;
        const count = await this.likeModel
            .countDocuments({ user: userId, note: noteId })
            .exec();
        return count > 0;
    }
    async listByNote(noteId, page = 1, limit = 20) {
        const skip = (Math.max(page, 1) - 1) * limit;
        const [items, total] = await Promise.all([
            this.likeModel
                .find({ note: noteId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.likeModel.countDocuments({ note: noteId }).exec(),
        ]);
        return { total, items };
    }
    async listNoteIdsByUser(userId) {
        const rows = await this.likeModel.find({ user: userId }).select('note').exec();
        return rows.map((r) => r.note.toString());
    }
    async countByNote(noteId) {
        return this.likeModel.countDocuments({ note: noteId }).exec();
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Like)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map