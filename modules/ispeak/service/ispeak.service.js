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
exports.IspeakService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const constant_1 = require("../../../common/constant");
const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let IspeakService = class IspeakService {
    constructor(IspeakModel) {
        this.IspeakModel = IspeakModel;
    }
    async getSpeakByPage(page = 1, limit = 10, findOption = {}) {
        const match = this.buildMatch(findOption);
        const skip = (Math.max(page, 1) - 1) * limit;
        const pipeline = [{ $match: match }];
        if (findOption.searchMode === 'text' && findOption.keyword) {
            pipeline.push({
                $addFields: {
                    __score: { $meta: 'textScore' },
                },
            });
        }
        pipeline.push({ $lookup: { from: model_name_1.ISpeakModelName.ISpeakTagList, localField: 'tag', foreignField: '_id', as: 'tag' } }, { $lookup: { from: model_name_1.ISpeakModelName.ISpeakTagList, localField: 'tags', foreignField: '_id', as: 'tags' } }, { $lookup: { from: model_name_1.UserModelName.User, localField: 'author', foreignField: '_id', as: 'author' } }, {
            $project: {
                _id: 1,
                updatedAt: 1,
                createdAt: 1,
                publishedAt: 1,
                archivedAt: 1,
                type: 1,
                visibility: 1,
                requireLogin: 1,
                content: 1,
                title: 1,
                tag: 1,
                tags: 1,
                mdc: 1,
                attachments: 1,
                location: 1,
                status: 1,
                theme: 1,
                cover: 1,
                pinned: 1,
                showComment: 1,
                author: 1,
                likeCount: 1,
                favoriteCount: 1,
                commentCount: 1,
                viewCount: 1,
                shareCount: 1,
                shareEnabled: 1,
                shareToken: 1,
                shareExpireAt: 1,
                device: 1,
                __score: 1,
            },
        });
        if (findOption.searchMode === 'text' && findOption.keyword) {
            pipeline.push({ $sort: { __score: { $meta: 'textScore' }, createdAt: -1 } });
        }
        else {
            pipeline.push({ $sort: { pinned: -1, createdAt: -1 } });
        }
        pipeline.push({
            $facet: {
                total: [{ $count: 'total' }],
                items: [{ $skip: skip }, { $limit: limit }],
            },
        });
        try {
            return await this.IspeakModel.aggregate(pipeline);
        }
        catch (err) {
            if (findOption.searchMode === 'text' && findOption.keyword) {
                return this.getSpeakByPage(page, limit, {
                    ...findOption,
                    searchMode: 'regex',
                });
            }
            throw err;
        }
    }
    buildMatch(option = {}) {
        const and = [];
        if (option.author && mongoose_2.Types.ObjectId.isValid(option.author)) {
            and.push({ author: new mongoose_2.Types.ObjectId(option.author) });
        }
        if (option.includeArchived) {
            if (option.status) {
                and.push({ status: option.status });
            }
        }
        else {
            and.push({ status: { $ne: constant_1.NoteStatus.ARCHIVED } });
        }
        const isOwner = option.requesterId &&
            option.author &&
            option.requesterId.toString() === option.author.toString();
        if (!isOwner) {
            const allowed = option.visibility?.length
                ? option.visibility
                : [constant_1.NoteVisibility.PUBLIC];
            and.push({ visibility: { $in: allowed } });
        }
        if (option.type?.length) {
            and.push({ type: { $in: option.type } });
        }
        if (option.tags?.length) {
            const ids = option.tags
                .filter((t) => mongoose_2.Types.ObjectId.isValid(t))
                .map((t) => new mongoose_2.Types.ObjectId(t));
            if (ids.length) {
                and.push({ $or: [{ tags: { $in: ids } }, { tag: { $in: ids } }] });
            }
        }
        else if (option.tag && mongoose_2.Types.ObjectId.isValid(option.tag)) {
            and.push({
                $or: [
                    { tag: new mongoose_2.Types.ObjectId(option.tag) },
                    { tags: new mongoose_2.Types.ObjectId(option.tag) },
                ],
            });
        }
        if (option.from || option.to) {
            const range = {};
            if (option.from)
                range.$gte = option.from;
            if (option.to)
                range.$lte = option.to;
            and.push({ createdAt: range });
        }
        if (option.pinned !== undefined) {
            and.push({ pinned: option.pinned });
        }
        if (option.keyword) {
            if (option.searchMode === 'text') {
                and.push({ $text: { $search: option.keyword } });
            }
            else {
                const safe = option.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                and.push({
                    $or: [
                        { title: { $regex: safe, $options: 'i' } },
                        { content: { $regex: safe, $options: 'i' } },
                    ],
                });
            }
        }
        return and.length ? { $and: and } : {};
    }
    andMatch(base, extra) {
        const and = base?.$and ? [...base.$and] : [];
        if (extra) {
            and.push(...(Array.isArray(extra) ? extra : [extra]));
        }
        return { $and: and };
    }
    async getTimeline(page = 1, limit = 20, groupBy = 'day', findOption = {}) {
        const match = this.buildMatch(findOption);
        const skip = (Math.max(page, 1) - 1) * limit;
        const dateExpr = groupBy === 'month'
            ? { $dateToString: { format: '%Y-%m', date: '$createdAt' } }
            : { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        const result = await this.IspeakModel.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    groups: [
                        {
                            $group: {
                                _id: dateExpr,
                                total: { $sum: 1 },
                                items: { $push: '$$ROOT' },
                            },
                        },
                        { $sort: { _id: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        { $unwind: '$items' },
                        {
                            $lookup: {
                                from: model_name_1.ISpeakModelName.ISpeakTagList,
                                localField: 'items.tag',
                                foreignField: '_id',
                                as: 'items.tag',
                            },
                        },
                        {
                            $lookup: {
                                from: model_name_1.ISpeakModelName.ISpeakTagList,
                                localField: 'items.tags',
                                foreignField: '_id',
                                as: 'items.tags',
                            },
                        },
                        {
                            $lookup: {
                                from: model_name_1.UserModelName.User,
                                localField: 'items.author',
                                foreignField: '_id',
                                as: 'items.author',
                            },
                        },
                        {
                            $group: {
                                _id: '$_id',
                                total: { $first: '$total' },
                                items: { $push: '$items' },
                            },
                        },
                    ],
                },
            },
        ]);
        const facet = result[0] || { total: [], groups: [] };
        const groups = (facet.groups || []).map((g) => ({
            key: g._id,
            label: this.formatGroupLabel(g._id, groupBy),
            total: g.total,
            items: g.items || [],
        }));
        return {
            total: facet.total?.[0]?.total || 0,
            groups,
        };
    }
    formatGroupLabel(key, groupBy) {
        const [y, m, d] = key.split('-').map(Number);
        if (groupBy === 'month') {
            return `${y}年${m}月`;
        }
        const date = new Date(y, (m || 1) - 1, d || 1);
        return `${y}年${m}月${d}日 ${WEEKDAYS[date.getDay()]}`;
    }
    async getCalendar(year, month, findOption = {}) {
        const match = this.buildMatch(findOption);
        const from = new Date(year, month ? month - 1 : 0, 1);
        const to = month
            ? new Date(year, month, 1)
            : new Date(year + 1, 0, 1);
        const scoped = this.andMatch(match, {
            createdAt: { $gte: from, $lt: to },
        });
        const rows = await this.IspeakModel.aggregate([
            { $match: scoped },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 },
                    items: {
                        $push: {
                            _id: '$_id',
                            title: '$title',
                            content: '$content',
                            createdAt: '$createdAt',
                            cover: '$cover',
                            attachments: '$attachments',
                            visibility: '$visibility',
                            status: '$status',
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        return {
            year,
            month: month || null,
            days: rows.map((row) => ({
                date: row._id,
                count: row.count,
                items: row.items,
            })),
        };
    }
    async getMapPoints(findOption = {}, limit = 500) {
        const match = this.buildMatch(findOption);
        const scoped = this.andMatch(match, { 'location.lat': { $ne: null } });
        const rows = await this.IspeakModel.aggregate([
            { $match: scoped },
            { $sort: { createdAt: -1 } },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    location: 1,
                    cover: 1,
                    createdAt: 1,
                    attachments: 1,
                    visibility: 1,
                    status: 1,
                },
            },
        ]);
        const buckets = new Map();
        rows.forEach((row) => {
            const key = `${Number(row.location?.lat).toFixed(3)},${Number(row.location?.lng).toFixed(3)}`;
            if (!buckets.has(key)) {
                buckets.set(key, {
                    key,
                    lat: row.location.lat,
                    lng: row.location.lng,
                    name: row.location.name,
                    address: row.location.address,
                    count: 0,
                    items: [],
                });
            }
            const bucket = buckets.get(key);
            bucket.count += 1;
            bucket.items.push({
                _id: row._id,
                title: row.title,
                content: row.content,
                createdAt: row.createdAt,
                cover: row.cover,
                attachments: row.attachments,
            });
        });
        return {
            total: rows.length,
            clusters: Array.from(buckets.values()),
        };
    }
    async archiveNote(id, author) {
        return this.IspeakModel.updateOne({ _id: id, author }, {
            $set: {
                status: constant_1.NoteStatus.ARCHIVED,
                archivedAt: new Date(),
            },
        }).exec();
    }
    async restoreNote(id, author) {
        return this.IspeakModel.updateOne({ _id: id, author }, {
            $set: { status: constant_1.NoteStatus.PUBLISHED, archivedAt: null },
        }).exec();
    }
    async getArchivedList(author, page = 1, limit = 20) {
        return this.getSpeakByPage(page, limit, {
            author,
            requesterId: author,
            includeArchived: true,
            status: constant_1.NoteStatus.ARCHIVED,
        });
    }
    async updateVisibility(id, author, visibility) {
        const type = visibility === constant_1.NoteVisibility.PRIVATE
            ? constant_1.LegacyNoteType.PRIVATE
            : constant_1.LegacyNoteType.PUBLIC;
        return this.IspeakModel.updateOne({ _id: id, author }, { $set: { visibility, type } }).exec();
    }
    async updateShare(id, author, shareEnabled, shareToken, shareExpireAt = null) {
        return this.IspeakModel.updateOne({ _id: id, author }, {
            $set: {
                shareEnabled,
                shareToken: shareEnabled ? shareToken : '',
                shareExpireAt: shareEnabled ? shareExpireAt : null,
            },
        }).exec();
    }
    async findByShareToken(shareToken) {
        const note = await this.IspeakModel.findOne({
            shareToken,
            shareEnabled: true,
        }).exec();
        if (!note)
            return null;
        if (note.shareExpireAt && note.shareExpireAt.getTime() < Date.now()) {
            return null;
        }
        return note;
    }
    async incCounter(id, field, delta = 1) {
        return this.IspeakModel.updateOne({ _id: id }, { $inc: { [field]: delta } }).exec();
    }
    async getStats(author) {
        const rows = await this.IspeakModel.aggregate([
            { $match: { author: new mongoose_2.Types.ObjectId(author) } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    published: {
                        $sum: { $cond: [{ $eq: ['$status', constant_1.NoteStatus.PUBLISHED] }, 1, 0] },
                    },
                    archived: {
                        $sum: { $cond: [{ $eq: ['$status', constant_1.NoteStatus.ARCHIVED] }, 1, 0] },
                    },
                    draft: {
                        $sum: { $cond: [{ $eq: ['$status', constant_1.NoteStatus.DRAFT] }, 1, 0] },
                    },
                    privateCount: {
                        $sum: {
                            $cond: [{ $eq: ['$visibility', constant_1.NoteVisibility.PRIVATE] }, 1, 0],
                        },
                    },
                    likeCount: { $sum: '$likeCount' },
                    favoriteCount: { $sum: '$favoriteCount' },
                    viewCount: { $sum: '$viewCount' },
                    shareCount: { $sum: '$shareCount' },
                    commentCount: { $sum: '$commentCount' },
                },
            },
        ]);
        return (rows[0] || {
            total: 0,
            published: 0,
            archived: 0,
            draft: 0,
            privateCount: 0,
            likeCount: 0,
            favoriteCount: 0,
            viewCount: 0,
            shareCount: 0,
            commentCount: 0,
        });
    }
    async addOneSpeak(createOption) {
        return this.IspeakModel.create(createOption);
    }
    async findOneAndUpdate(findOptions, updateOptions) {
        return this.IspeakModel.updateOne(findOptions, updateOptions).exec();
    }
    async findOneAndDelete(findOptions) {
        return this.IspeakModel.findOneAndDelete(findOptions).exec();
    }
    async findOne(findOption) {
        return this.IspeakModel.find(findOption);
    }
    async findOneDoc(findOption) {
        return this.IspeakModel.findOne(findOption).exec();
    }
};
IspeakService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.ISpeakModelName.ISpeakList)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IspeakService);
exports.IspeakService = IspeakService;
//# sourceMappingURL=ispeak.service.js.map