import { Model } from 'mongoose';
import { MdcComponentDefinition, MdcRegistry } from '../../../common/markdown/mdc';
export declare class MdcService {
    private readonly mdcModel;
    constructor(mdcModel: Model<any>);
    getRegistry(userId?: string): Promise<MdcRegistry>;
    list(userId?: string): Promise<any[]>;
    toDefinition(row: any): MdcComponentDefinition;
    upsert(userId: string, payload: any): Promise<any>;
    remove(userId: string, id: string): Promise<any>;
    render(content: string, userId?: string, noteConfig?: any): Promise<import("../../../common/markdown/mdc").MdcRenderResult>;
}
