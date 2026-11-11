import * as mongoose from 'mongoose';
export declare class Share {
    user: any;
    note: any;
    shareToken: string;
    channel: string;
    device: any;
    ip: string;
    isOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ShareSchema: mongoose.Schema<Share, mongoose.Model<Share, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Share>;
