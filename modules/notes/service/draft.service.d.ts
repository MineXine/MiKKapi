import { Model } from 'mongoose';
export declare class DraftService {
    private readonly draftModel;
    constructor(draftModel: Model<any>);
    autosave(userId: string, draftKey: string, payload: any): Promise<any>;
    list(userId: string, page?: number, limit?: number): Promise<{
        total: number;
        items: any[];
    }>;
    findOne(userId: string, draftKey: string): Promise<any>;
    remove(userId: string, draftKey: string): Promise<any>;
    purge(userId: string, days?: number): Promise<number>;
    count(userId: string): Promise<number>;
    findNoteIds(userId: string): Promise<any[]>;
    exists(userId: string, draftKey: string): Promise<boolean>;
    countByNote(noteId: string): Promise<number>;
}
