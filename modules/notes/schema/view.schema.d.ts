import * as mongoose from 'mongoose';
export declare class View {
    user: any;
    name: string;
    type: string;
    description: string;
    filters: any;
    sort: string;
    layout: any;
    icon: string;
    color: string;
    pinned: boolean;
    builtin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ViewSchema: mongoose.Schema<View, mongoose.Model<View, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, View>;
