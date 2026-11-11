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
exports.AttachmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const storage_1 = require("../../../common/storage");
let AttachmentService = class AttachmentService {
    constructor(attachmentModel) {
        this.attachmentModel = attachmentModel;
    }
    async upload(userId, payload) {
        const kind = (0, storage_1.guessKind)(payload.mime, payload.filename);
        const saved = await (0, storage_1.saveAttachment)({
            filename: payload.filename,
            mime: payload.mime,
            data: payload.data,
            url: payload.url,
            size: payload.size,
        });
        const record = await this.attachmentModel.create({
            user: userId,
            note: payload.noteId || null,
            name: payload.filename,
            url: saved.url,
            key: saved.key,
            mime: payload.mime || '',
            size: saved.size,
            kind,
            width: payload.width ?? null,
            height: payload.height ?? null,
            duration: payload.duration ?? null,
            data: saved.driver === 'base64' ? payload.data || '' : '',
            device: payload.device || null,
        });
        return this.toReference(record);
    }
    toReference(record) {
        return {
            id: record._id.toString(),
            name: record.name,
            url: record.url,
            mime: record.mime,
            size: record.size,
            kind: record.kind,
            width: record.width,
            height: record.height,
            duration: record.duration,
        };
    }
    async list(userId, options = {}) {
        const page = options.page || 1;
        const limit = options.limit || 20;
        const skip = (Math.max(page, 1) - 1) * limit;
        const filter = { user: userId };
        if (options.noteId)
            filter.note = options.noteId;
        if (options.kind)
            filter.kind = options.kind;
        const [items, total] = await Promise.all([
            this.attachmentModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.attachmentModel.countDocuments(filter).exec(),
        ]);
        return { total, items: items.map((i) => this.toReference(i)) };
    }
    async remove(id, userId) {
        const record = await this.attachmentModel
            .findOne({ _id: id, user: userId })
            .exec();
        if (!record)
            return null;
        await (0, storage_1.removeAttachment)(record.key);
        await this.attachmentModel.findOneAndDelete({ _id: id }).exec();
        return record;
    }
    async bindToNote(ids, noteId, userId) {
        if (!ids?.length)
            return [];
        await this.attachmentModel
            .updateMany({ _id: { $in: ids }, user: userId }, { $set: { note: noteId } })
            .exec();
        const rows = await this.attachmentModel
            .find({ _id: { $in: ids }, user: userId })
            .exec();
        return rows.map((r) => this.toReference(r));
    }
    async referencesOf(noteId) {
        const rows = await this.attachmentModel
            .find({ note: new mongoose_2.Types.ObjectId(noteId) })
            .exec();
        return rows.map((r) => this.toReference(r));
    }
};
AttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.Attachment)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttachmentService);
exports.AttachmentService = AttachmentService;
//# sourceMappingURL=attachment.service.js.map