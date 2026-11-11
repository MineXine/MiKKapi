import * as mongoose from 'mongoose';
export declare class Like {
    user: any;
    note: any;
    device: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare const LikeSchema: mongoose.Schema<Like, mongoose.Model<Like, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Like>;
