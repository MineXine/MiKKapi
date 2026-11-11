import { Model } from 'mongoose';
export interface SpeakQueryOptions {
    author?: string;
    requesterId?: string;
    visibility?: string[];
    type?: string[];
    tag?: string;
    tags?: string[];
    status?: string;
    includeArchived?: boolean;
    keyword?: string;
    searchMode?: 'text' | 'regex';
    from?: Date;
    to?: Date;
    pinned?: boolean;
}
export interface TimelineGroup {
    key: string;
    label: string;
    total: number;
    items: any[];
}
export declare class IspeakService {
    private readonly IspeakModel;
    constructor(IspeakModel: Model<any>);
    getSpeakByPage(page?: number, limit?: number, findOption?: SpeakQueryOptions): any;
    buildMatch(option?: SpeakQueryOptions): any;
    private andMatch;
    getTimeline(page?: number, limit?: number, groupBy?: 'day' | 'month', findOption?: SpeakQueryOptions): Promise<{
        total: number;
        groups: TimelineGroup[];
    }>;
    private formatGroupLabel;
    getCalendar(year: number, month?: number, findOption?: SpeakQueryOptions): Promise<{
        year: number;
        month: number;
        days: {
            date: any;
            count: any;
            items: any;
        }[];
    }>;
    getMapPoints(findOption?: SpeakQueryOptions, limit?: number): Promise<{
        total: number;
        clusters: any[];
    }>;
    archiveNote(id: string, author: string): Promise<import("mongodb").UpdateResult>;
    restoreNote(id: string, author: string): Promise<import("mongodb").UpdateResult>;
    getArchivedList(author: string, page?: number, limit?: number): Promise<any>;
    updateVisibility(id: string, author: string, visibility: string): Promise<import("mongodb").UpdateResult>;
    updateShare(id: string, author: string, shareEnabled: boolean, shareToken: string, shareExpireAt?: Date): Promise<import("mongodb").UpdateResult>;
    findByShareToken(shareToken: string): Promise<any>;
    incCounter(id: string, field: string, delta?: number): Promise<import("mongodb").UpdateResult>;
    getStats(author: string): Promise<any>;
    addOneSpeak(createOption: any): Promise<any>;
    findOneAndUpdate(findOptions: any, updateOptions: any): Promise<import("mongodb").UpdateResult>;
    findOneAndDelete(findOptions: any): Promise<any>;
    findOne(findOption: any): Promise<any[]>;
    findOneDoc(findOption: any): Promise<any>;
}
