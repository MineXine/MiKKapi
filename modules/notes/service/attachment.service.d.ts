import { Model } from 'mongoose';
export declare class AttachmentService {
    private readonly attachmentModel;
    constructor(attachmentModel: Model<any>);
    upload(userId: string, payload: {
        filename: string;
        mime?: string;
        data?: string;
        url?: string;
        size?: number;
        width?: number;
        height?: number;
        duration?: number;
        noteId?: string;
        device?: any;
    }): Promise<{
        id: any;
        name: any;
        url: any;
        mime: any;
        size: any;
        kind: any;
        width: any;
        height: any;
        duration: any;
    }>;
    toReference(record: any): {
        id: any;
        name: any;
        url: any;
        mime: any;
        size: any;
        kind: any;
        width: any;
        height: any;
        duration: any;
    };
    list(userId: string, options?: {
        noteId?: string;
        kind?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        total: number;
        items: {
            id: any;
            name: any;
            url: any;
            mime: any;
            size: any;
            kind: any;
            width: any;
            height: any;
            duration: any;
        }[];
    }>;
    remove(id: string, userId: string): Promise<any>;
    bindToNote(ids: string[], noteId: string, userId: string): Promise<{
        id: any;
        name: any;
        url: any;
        mime: any;
        size: any;
        kind: any;
        width: any;
        height: any;
        duration: any;
    }[]>;
    referencesOf(noteId: string): Promise<{
        id: any;
        name: any;
        url: any;
        mime: any;
        size: any;
        kind: any;
        width: any;
        height: any;
        duration: any;
    }[]>;
}
