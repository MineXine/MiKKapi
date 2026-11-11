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
exports.MdcService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const mdc_1 = require("../../../common/markdown/mdc");
function inferPropType(value) {
    if (Array.isArray(value))
        return 'array';
    switch (typeof value) {
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'object':
            return 'object';
        default:
            return 'string';
    }
}
let MdcService = class MdcService {
    constructor(mdcModel) {
        this.mdcModel = mdcModel;
    }
    async getRegistry(userId) {
        const filter = { enabled: { $ne: false } };
        if (userId) {
            filter.$or = [{ global: true }, { user: userId }];
        }
        else {
            filter.global = true;
        }
        const rows = await this.mdcModel.find(filter).exec();
        const registry = {};
        rows
            .sort((a, b) => (a.global === b.global ? 0 : a.global ? -1 : 1))
            .forEach((row) => {
            registry[row.name] = this.toDefinition(row);
        });
        return registry;
    }
    async list(userId) {
        const filter = {};
        if (userId) {
            filter.$or = [{ global: true }, { user: userId }];
        }
        return this.mdcModel.find(filter).sort({ name: 1 }).exec();
    }
    toDefinition(row) {
        return {
            name: row.name,
            title: row.title,
            description: row.description,
            props: Array.isArray(row.props) ? row.props : [],
            slot: row.slot !== false,
            global: !!row.global,
            enabled: row.enabled !== false,
        };
    }
    async upsert(userId, payload) {
        const { name, title, description, props, slot, global, enabled, icon } = payload;
        if (!name) {
            throw new Error('组件名不能为空');
        }
        const normalizedProps = (Array.isArray(props) ? props : []).map((p) => ({
            key: p.key,
            type: p.type || 'string',
            default: p.default,
            required: !!p.required,
            options: p.options || undefined,
            description: p.description || '',
        }));
        const existing = await this.mdcModel.findOne({ user: userId, name }).exec();
        if (existing) {
            existing.title = title ?? existing.title;
            existing.description = description ?? existing.description;
            existing.props = normalizedProps;
            existing.slot = slot ?? existing.slot;
            existing.global = global ?? existing.global;
            existing.enabled = enabled ?? existing.enabled;
            existing.icon = icon ?? existing.icon;
            await existing.save();
            return existing;
        }
        return this.mdcModel.create({
            user: userId,
            name,
            title: title || name,
            description: description || '',
            props: normalizedProps,
            slot: slot !== false,
            global: !!global,
            enabled: enabled !== false,
            icon: icon || '',
        });
    }
    async remove(userId, id) {
        return this.mdcModel.findOneAndDelete({ _id: id, user: userId }).exec();
    }
    async render(content, userId, noteConfig) {
        const registry = await this.getRegistry(userId);
        if (noteConfig?.enabledComponents?.length) {
            const allowed = new Set(noteConfig.enabledComponents);
            Object.keys(registry).forEach((name) => {
                if (!allowed.has(name))
                    delete registry[name];
            });
        }
        const overrides = noteConfig?.componentOptions || {};
        Object.keys(overrides).forEach((name) => {
            if (!registry[name])
                return;
            const def = registry[name];
            const extra = overrides[name] || {};
            def.props = [...(def.props || [])];
            Object.keys(extra).forEach((key) => {
                const exist = def.props.find((p) => p.key === key);
                if (exist) {
                    exist.default = extra[key];
                }
                else {
                    def.props.push({
                        key,
                        type: inferPropType(extra[key]),
                        default: extra[key],
                        required: false,
                    });
                }
            });
        });
        return (0, mdc_1.renderMdc)(content, registry);
    }
};
MdcService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.NoteModelName.MdcComponent)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MdcService);
exports.MdcService = MdcService;
//# sourceMappingURL=mdc.service.js.map