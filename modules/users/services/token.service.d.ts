import { Model } from 'mongoose';
export declare class TokenService {
    private readonly tokenModel;
    constructor(tokenModel: Model<any>);
    getAllToken(findOptions: any): Promise<any[]>;
    getOneToken(findOptions: any): Promise<any>;
    addOneToken(options: any): Promise<any>;
    updateOneToken(findOptions: any, updateOption: any): Promise<import("mongodb").UpdateResult>;
    deleteOneToken(findOptions: any): Promise<any>;
}
