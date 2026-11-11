"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlainText = exports.renderMdc = exports.resolveMdcProps = exports.parseMdcBlocks = exports.parseMdcProps = void 0;
function readValue(src, from) {
    let i = from;
    if (src[i] === '"' || src[i] === "'") {
        const quote = src[i];
        i++;
        let out = '';
        while (i < src.length) {
            if (src[i] === '\\' && i + 1 < src.length) {
                const next = src[i + 1];
                out +=
                    next === 'n'
                        ? '\n'
                        : next === 't'
                            ? '\t'
                            : next === 'r'
                                ? '\r'
                                : next;
                i += 2;
                continue;
            }
            if (src[i] === quote) {
                i++;
                break;
            }
            out += src[i];
            i++;
        }
        return { value: out, next: i };
    }
    if (src[i] === '[') {
        let depth = 0;
        const startIdx = i;
        while (i < src.length) {
            if (src[i] === '[')
                depth++;
            else if (src[i] === ']') {
                depth--;
                if (depth === 0) {
                    i++;
                    break;
                }
            }
            i++;
        }
        const inner = src.slice(startIdx + 1, i - 1);
        return { value: splitTopLevel(inner).map(coerceScalar), next: i };
    }
    if (src[i] === '{') {
        let depth = 0;
        const startIdx = i;
        while (i < src.length) {
            if (src[i] === '{')
                depth++;
            else if (src[i] === '}') {
                depth--;
                if (depth === 0) {
                    i++;
                    break;
                }
            }
            i++;
        }
        const inner = src.slice(startIdx + 1, i - 1);
        return { value: parseMdcProps(inner), next: i };
    }
    const start = i;
    while (i < src.length && !/[\s,}]/.test(src[i]))
        i++;
    return { value: coerceScalar(src.slice(start, i)), next: i };
}
function splitTopLevel(input) {
    const out = [];
    let depth = 0;
    let quote = null;
    let cur = '';
    for (const ch of input) {
        if (quote) {
            cur += ch;
            if (ch === quote)
                quote = null;
            continue;
        }
        if (ch === '"' || ch === "'") {
            quote = ch;
            cur += ch;
            continue;
        }
        if (ch === '[' || ch === '{')
            depth++;
        if (ch === ']' || ch === '}')
            depth--;
        if (ch === ',' && depth === 0) {
            if (cur.trim())
                out.push(cur.trim());
            cur = '';
            continue;
        }
        cur += ch;
    }
    if (cur.trim())
        out.push(cur.trim());
    return out;
}
function coerceScalar(raw) {
    const v = raw.trim();
    if (v === 'true')
        return true;
    if (v === 'false')
        return false;
    if (v === 'null')
        return null;
    if (v === 'undefined')
        return undefined;
    if (/^-?\d+(\.\d+)?$/.test(v))
        return Number(v);
    if ((v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))) {
        return v.slice(1, -1);
    }
    return v;
}
function parseMdcProps(raw) {
    const result = {};
    if (!raw)
        return result;
    let src = raw.trim();
    if (src.startsWith('{'))
        src = src.slice(1);
    if (src.endsWith('}'))
        src = src.slice(0, -1);
    let i = 0;
    while (i < src.length) {
        while (i < src.length && /[\s,]/.test(src[i]))
            i++;
        if (i >= src.length)
            break;
        let key = '';
        while (i < src.length && /[\w\-.]/.test(src[i])) {
            key += src[i];
            i++;
        }
        if (!key) {
            i++;
            continue;
        }
        while (i < src.length && /\s/.test(src[i]))
            i++;
        if (src[i] !== '=' && src[i] !== ':') {
            result[key] = true;
            continue;
        }
        i++;
        while (i < src.length && /\s/.test(src[i]))
            i++;
        const { value, next } = readValue(src, i);
        result[key] = value;
        i = next;
    }
    return result;
}
exports.parseMdcProps = parseMdcProps;
const COMPONENT_OPEN_REGEX = /^::([a-zA-Z][\w.-]*)\s*(\{[\s\S]*?\})?\s*$/;
const COMPONENT_CLOSE_REGEX = /^::\s*$/;
function parseMdcBlocks(content) {
    const blocks = [];
    if (!content)
        return blocks;
    const lines = content.split(/\r?\n/);
    let buffer = [];
    const flushMarkdown = () => {
        const text = buffer.join('\n');
        if (text.trim()) {
            blocks.push({ type: 'markdown', content: text });
        }
        buffer = [];
    };
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const matched = line.trim().match(COMPONENT_OPEN_REGEX);
        if (!matched) {
            buffer.push(line);
            continue;
        }
        let closeIndex = -1;
        for (let j = i + 1; j < lines.length; j++) {
            if (COMPONENT_CLOSE_REGEX.test(lines[j].trim())) {
                closeIndex = j;
                break;
            }
        }
        const name = matched[1];
        const rawProps = parseMdcProps(matched[2] || '');
        if (closeIndex === -1) {
            flushMarkdown();
            blocks.push({
                type: 'component',
                name,
                rawProps,
                props: rawProps,
                children: '',
                resolved: false,
            });
            i = i;
            continue;
        }
        flushMarkdown();
        const children = lines.slice(i + 1, closeIndex).join('\n');
        blocks.push({
            type: 'component',
            name,
            rawProps,
            props: rawProps,
            children,
            resolved: false,
        });
        i = closeIndex;
    }
    flushMarkdown();
    return blocks;
}
exports.parseMdcBlocks = parseMdcBlocks;
function coerceToType(value, type) {
    if (value === undefined || value === null)
        return value;
    switch (type) {
        case 'number': {
            const n = Number(value);
            return Number.isNaN(n) ? value : n;
        }
        case 'boolean':
            if (typeof value === 'boolean')
                return value;
            if (value === 'true')
                return true;
            if (value === 'false')
                return false;
            return Boolean(value);
        case 'array':
            return Array.isArray(value) ? value : [value];
        case 'object':
            return typeof value === 'object' && !Array.isArray(value)
                ? value
                : { value };
        case 'string':
        default:
            return typeof value === 'string' ? value : String(value);
    }
}
function resolveMdcProps(name, rawProps, registry = {}) {
    const definition = registry[name];
    if (!definition || definition.enabled === false) {
        return { props: { ...rawProps }, resolved: false };
    }
    const props = {};
    (definition.props || []).forEach((def) => {
        if (def.default !== undefined) {
            props[def.key] = coerceToType(def.default, def.type || 'string');
        }
    });
    Object.keys(rawProps || {}).forEach((key) => {
        const def = (definition.props || []).find((p) => p.key === key);
        if (def) {
            props[key] = coerceToType(rawProps[key], def.type || 'string');
        }
        else {
            props[key] = rawProps[key];
        }
    });
    const missing = (definition.props || [])
        .filter((p) => p.required && props[p.key] === undefined)
        .map((p) => p.key);
    if (missing.length) {
        props['__missingRequired'] = missing;
    }
    return { props, resolved: true };
}
exports.resolveMdcProps = resolveMdcProps;
function renderMdc(content, registry = {}) {
    const rawBlocks = parseMdcBlocks(content);
    const blocks = [];
    const components = [];
    const usedComponents = [];
    rawBlocks.forEach((block) => {
        if (block.type === 'markdown') {
            blocks.push(block);
            return;
        }
        const { props, resolved } = resolveMdcProps(block.name, block.rawProps, registry);
        const component = {
            type: 'component',
            name: block.name,
            rawProps: block.rawProps,
            props,
            children: block.children,
            resolved,
        };
        blocks.push(component);
        components.push(component);
        if (!usedComponents.includes(block.name)) {
            usedComponents.push(block.name);
        }
    });
    return { blocks, components, usedComponents };
}
exports.renderMdc = renderMdc;
function extractPlainText(content, limit = 200) {
    if (!content)
        return '';
    const text = content
        .replace(/^::[\w.-]*(\{[\s\S]*?\})?$/gm, ' ')
        .replace(/^::\s*$/gm, ' ')
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[*_`>#~-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > limit ? `${text.slice(0, limit)}…` : text;
}
exports.extractPlainText = extractPlainText;
//# sourceMappingURL=mdc.js.map