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
exports.DraftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let DraftService = class DraftService {
    constructor(draftModel) {
        this.draftModel = draftModel;
    }
    async autosave(userId, draftKey, payload) {
        const now = new Date();
        const doc = await this.draftModel
            .findOneAndUpdate({ user: userId, draftKey }, {
            $set: {
                title: payload.title || '',
                content: payload.content || '',
                tags: payload.tags || [],
                mdc: payload.mdc || { enabledComponents: [], componentOptions: {} },
                attachments: payload.attachments || [],
                location: payload.location || null,
                theme: payload.theme || 'default',
                note: payload.note || null,
                device: payload.device || null,
                autosavedAt: now,
            },
            $inc: { autosaveCount: 1 },
            $setOnInsert: { createdAt: now },
        }, { upsert: true, new: true, setDefaultsOnInsert: true })
            .exec();
        return doc;
    }
    async list(userId, page = 1, limit = 20) {
        const skip = (Math.max(page, 1) - 1) * limit;
        const [items, total] = await Promise.all([
            this.draftModel
                .find({ user: userId })
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.draftModel.countDocuments({ user: userId }).exec(),
        ]);
        return { total, items };
    }
    async findOne(userId, draftKey) {
        return this.draftModel.findOne({ user: userId, draftKey }).exec();
    }
    async remove(userId, draftKey) {
        return this.draftModel.findOneAndDelete({ user: userId, draftKey }).exec();
    }
    async purge(userId, days = 30) {
        const before = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const res = await this.draftModel
            .deleteMany({ user: userId, updatedAt: { $lt: before } })
            .exec();
        return res.deletedCount || 0;
    }
    async count(userId) {
        return this.draftModel.countDocuments({ user: userId }).exec();
    }
    async findNoteIds(userId) {
        const rows = await this.draftModel
            .find({ user: userId, note: { $ne: null } })
            .select('note')
            .exec();
        return rows
            .map((r) => r.note?.toString?.())
            .filter(Boolean);
    }
    async exists(userId, draftKey) {
        const count = await this.draftModel
            .countDocuments({ user: userId, draftKey })
            .exec();
        return count > 0;
    }
    async countByNote(noteId) {
        return this.draftModel.countDocuments({ note: noteId }).exec();
    }
};
DraftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Draft)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DraftService);
exports.DraftService = DraftService;
//# sourceMappingURL=draft.service.js.map