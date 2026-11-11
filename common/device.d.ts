import { DeviceType } from './constant';
export interface DeviceInfo {
    ua: string;
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    deviceType: DeviceType;
    platform: string;
    isBot: boolean;
    isWechat: boolean;
    ip?: string;
    client?: {
        name?: string;
        version?: string;
        platform?: string;
        os?: string;
        deviceType?: string;
    };
}
export declare function parseDevice(ua?: string): DeviceInfo;
export declare function extractDevice(req: any): DeviceInfo;
export declare function formatDevice(info: DeviceInfo): string;
export declare function deviceTypeLabel(type: DeviceType): string;
