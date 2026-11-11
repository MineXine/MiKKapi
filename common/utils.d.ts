export declare function urlToObj(str: string): Record<string, string>;
export declare function toTreeByRecursion(data: any[], parentKey?: string, childrenKey?: string): any[];
export declare function randomToken(length?: number): string;
export declare function throttleByKey(key: string, ttl: number, fn: () => void, store?: Map<string, number>): boolean;
export declare function toDateKey(date: Date | string | number): string;
export declare function toMonthKey(date: Date | string | number): string;
