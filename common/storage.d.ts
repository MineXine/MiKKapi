import { StorageDriver } from './constant';
export interface SaveInput {
    filename: string;
    mime?: string;
    data?: string;
    url?: string;
    size?: number;
}
export interface SaveResult {
    key: string;
    url: string;
    size: number;
    driver: StorageDriver;
}
export interface StorageAdapter {
    save(input: SaveInput): Promise<SaveResult>;
    remove(key: string): Promise<boolean>;
}
export declare function saveAttachment(input: SaveInput): Promise<SaveResult>;
export declare function removeAttachment(key: string): Promise<boolean>;
export declare function guessKind(mime?: string, filename?: string): 'image' | 'video' | 'audio' | 'file';
