import * as mongoose from 'mongoose';
export declare class Favorite {
    user: any;
    note: any;
    folder: string;
    remark: string;
    device: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FavoriteSchema: mongoose.Schema<Favorite, mongoose.Model<Favorite, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Favorite>;
