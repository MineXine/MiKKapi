import * as mongoose from 'mongoose';
export declare class GeoPoint {
    name: string;
    address: string;
    lat: number;
    lng: number;
}
export declare const GeoPointSchema: mongoose.Schema<GeoPoint, mongoose.Model<GeoPoint, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, GeoPoint>;
export declare class NoteAttachment {
    id: string;
    name: string;
    url: string;
    mime: string;
    size: number;
    kind: string;
    width: number;
    height: number;
    duration: number;
}
export declare const NoteAttachmentSchema: mongoose.Schema<NoteAttachment, mongoose.Model<NoteAttachment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NoteAttachment>;
export declare class NoteMdcConfig {
    enabledComponents: string[];
    componentOptions: {
        [key: string]: {
            [key: string]: any;
        };
    };
}
export declare const NoteMdcConfigSchema: mongoose.Schema<NoteMdcConfig, mongoose.Model<NoteMdcConfig, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NoteMdcConfig>;
export declare class Ispeak {
    title: string;
    content: string;
    contentFormat: string;
    type: string;
    visibility: string;
    requireLogin: boolean;
    tag: any;
    tags: any[];
    mdc: NoteMdcConfig;
    attachments: NoteAttachment[];
    location: GeoPoint;
    status: string;
    archivedAt: Date;
    publishedAt: Date;
    theme: string;
    cover: string;
    pinned: boolean;
    showComment: string;
    author: string;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
    viewCount: number;
    shareCount: number;
    shareToken: string;
    shareEnabled: boolean;
    shareExpireAt: Date;
    device: any;
    updatedAt: Date;
    createdAt: Date;
}
export declare const IspeakSchema: mongoose.Schema<Ispeak, mongoose.Model<Ispeak, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ispeak>;
