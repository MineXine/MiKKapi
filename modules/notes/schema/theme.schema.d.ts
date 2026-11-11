import * as mongoose from 'mongoose';
export declare class Theme {
    user: any;
    name: string;
    key: string;
    mode: string;
    tokens: any;
    color: string;
    followSystem: boolean;
    builtin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ThemeSchema: mongoose.Schema<Theme, mongoose.Model<Theme, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Theme>;
