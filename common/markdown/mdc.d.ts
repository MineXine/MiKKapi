export type MdcPropType = 'string' | 'number' | 'boolean' | 'array' | 'object';
export interface MdcPropDefinition {
    key: string;
    type: MdcPropType;
    default?: any;
    required?: boolean;
    options?: string[];
    description?: string;
}
export interface MdcComponentDefinition {
    name: string;
    title?: string;
    description?: string;
    props: MdcPropDefinition[];
    slot?: boolean;
    global?: boolean;
    enabled?: boolean;
}
export type MdcRegistry = Record<string, MdcComponentDefinition>;
export interface MdcComponentBlock {
    type: 'component';
    name: string;
    rawProps: Record<string, any>;
    props: Record<string, any>;
    children: string;
    resolved: boolean;
}
export interface MdcMarkdownBlock {
    type: 'markdown';
    content: string;
}
export type MdcBlock = MdcComponentBlock | MdcMarkdownBlock;
export interface MdcRenderResult {
    blocks: MdcBlock[];
    components: MdcComponentBlock[];
    usedComponents: string[];
}
export declare function parseMdcProps(raw: string): Record<string, any>;
export declare function parseMdcBlocks(content: string): MdcBlock[];
export declare function resolveMdcProps(name: string, rawProps: Record<string, any>, registry?: MdcRegistry): {
    props: Record<string, any>;
    resolved: boolean;
};
export declare function renderMdc(content: string, registry?: MdcRegistry): MdcRenderResult;
export declare function extractPlainText(content: string, limit?: number): string;
