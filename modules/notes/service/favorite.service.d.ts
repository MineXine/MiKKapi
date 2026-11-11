import { Model } from 'mongoose';
export declare class FavoriteService {
    private readonly favoriteModel;
    constructor(favoriteModel: Model<any>);
    favorite(noteId: string, userId: string, folder?: string, remark?: string, device?: any): Promise<{
        favorited: boolean;
        created: boolean;
        record: any;
    }>;
    unfavorite(noteId: string, userId: string): Promise<{
        favorited: boolean;
        removed: boolean;
    }>;
    isFavorited(noteId: string, userId: string): Promise<boolean>;
    list(userId: string, options?: {
        folder?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        total: number;
        items: any[];
    }>;
    folders(userId: string): Promise<{
        folder: any;
        count: any;
    }[]>;
    countByNote(noteId: string): Promise<number>;
}
