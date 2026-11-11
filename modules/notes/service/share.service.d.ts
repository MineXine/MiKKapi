import { Model } from 'mongoose';
export declare class ShareService {
    private readonly shareModel;
    constructor(shareModel: Model<any>);
    record(options: {
        noteId?: string;
        userId?: string;
        shareToken?: string;
        channel?: string;
        device?: any;
        ip?: string;
        isOwner?: boolean;
    }): Promise<any>;
    stats(noteId: string): Promise<{
        total: any;
        byChannel: {
            channel: any;
            count: any;
        }[];
    }>;
    listByNote(noteId: string, page?: number, limit?: number): Promise<{
        total: number;
        items: any[];
    }>;
}
