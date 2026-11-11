import * as mongoose from 'mongoose';
export declare class IspeakTag {
    name: string;
    bgColor: string;
    textColor: string;
    icon: string;
    user: any;
    orderNo: number;
    description: string;
    noteCount: number;
}
export declare const IspeakTagSchema: mongoose.Schema<IspeakTag, mongoose.Model<IspeakTag, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IspeakTag>;
