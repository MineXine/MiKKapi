import { Model } from 'mongoose';
export declare class ThemeService {
    private readonly themeModel;
    constructor(themeModel: Model<any>);
    list(userId: string): Promise<any[]>;
    findOne(userId: string, id: string): Promise<any>;
    create(userId: string, payload: any): Promise<any>;
    update(userId: string, id: string, payload: any): Promise<import("mongodb").UpdateResult>;
    remove(userId: string, id: string): Promise<any>;
    ensureBuiltinThemes(userId: string): Promise<any[]>;
}
