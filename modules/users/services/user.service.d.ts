import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<any>);
    findOne(userFindOptions: any, hasPassword?: boolean): Promise<any>;
    createOne(createOptions: any): Promise<any>;
    findAll(): Promise<any[]>;
    userCount(): Promise<number>;
    deleteOne(deleteOptions: any): Promise<import("mongodb").DeleteResult>;
    updateOne(findOptions: any, updateOptions: any): Promise<import("mongodb").UpdateResult>;
}
