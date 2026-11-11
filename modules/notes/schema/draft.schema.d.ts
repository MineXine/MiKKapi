import * as mongoose from 'mongoose';
export declare class Draft {
    user: any;
    draftKey: string;
    note: any;
    title: string;
    content: string;
    tags: string[];
    mdc: any;
    attachments: any[];
    location: any;
    theme: string;
    autosaveCount: number;
    autosavedAt: Date;
    device: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DraftSchema: mongoose.Schema<Draft, mongoose.Model<Draft, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Draft>;
