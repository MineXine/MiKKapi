import { Model } from 'mongoose';
export declare class ViewService {
    private readonly viewModel;
    constructor(viewModel: Model<any>);
    create(userId: string, payload: any): Promise<any>;
    list(userId: string): Promise<any[]>;
    findOne(userId: string, id: string): Promise<any>;
    update(userId: string, id: string, payload: any): Promise<import("mongodb").UpdateResult>;
    remove(userId: string, id: string): Promise<any>;
    ensureBuiltinViews(userId: string): Promise<any[]>;
}
