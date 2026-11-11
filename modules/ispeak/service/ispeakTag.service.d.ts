import { Model } from 'mongoose';
export declare class IspeakTagService {
    private readonly ispeakTagModal;
    constructor(ispeakTagModal: Model<any>);
    createOneTag(name: string, bgColor?: string, other?: any): Promise<any>;
    findOneTag(options: any): Promise<any>;
    getTagList(options: any): Promise<any[]>;
    findIspeakTagByPage(page?: number, limit?: number, findOption?: any): Promise<any[]>;
    findOneIspeakTagUpdate(findOptions: any, updateOptions: any): Promise<import("mongodb").UpdateResult>;
    deleteOneTag(findOptions: any): Promise<any>;
    getTagOverview(user: string, author?: string): Promise<any[]>;
}
