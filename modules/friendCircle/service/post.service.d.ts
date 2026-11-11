import { Model } from 'mongoose';
export declare class PostService {
    private readonly postModel;
    constructor(postModel: Model<any>);
    createOne(createOptions: any): Promise<any>;
    findAll(): Promise<any[]>;
    userCount(): Promise<number>;
    deleteOne(deleteOptions: any): Promise<import("mongodb").DeleteResult>;
}
