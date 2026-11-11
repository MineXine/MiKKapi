import * as mongoose from 'mongoose';
export declare class Token {
    title: string;
    value: string;
    user: string;
    lastUsedAt: Date;
    lastDevice: any;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Token>;
