import * as mongoose from 'mongoose';
export declare class Attachment {
    note: any;
    user: any;
    name: string;
    url: string;
    key: string;
    mime: string;
    size: number;
    kind: string;
    width: number;
    height: number;
    duration: number;
    data: string;
    device: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AttachmentSchema: mongoose.Schema<Attachment, mongoose.Model<Attachment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attachment>;
