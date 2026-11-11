import { Model } from 'mongoose';
export declare class LikeService {
    private readonly likeModel;
    constructor(likeModel: Model<any>);
    like(noteId: string, userId: string, device?: any): Promise<{
        liked: boolean;
        created: boolean;
        record: any;
    }>;
    unlike(noteId: string, userId: string): Promise<{
        liked: boolean;
        removed: boolean;
    }>;
    isLiked(noteId: string, userId: string): Promise<boolean>;
    listByNote(noteId: string, page?: number, limit?: number): Promise<{
        total: number;
        items: any[];
    }>;
    listNoteIdsByUser(userId: string): Promise<any[]>;
    countByNote(noteId: string): Promise<number>;
}
