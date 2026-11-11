"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceTypeLabel = exports.formatDevice = exports.extractDevice = exports.parseDevice = void 0;
const constant_1 = require("./constant");
const BOT_REGEX = /(bot|crawler|spider|slurp|bingpreview|headlesschrome|curl\/|wget|python-requests|axios\/|okhttp)/i;
function matchVersion(ua, ...patterns) {
    for (const p of patterns) {
        const m = ua.match(p);
        if (m && m[1])
            return m[1].replace(/_/g, '.');
    }
    return '';
}
function parseBrowser(ua) {
    if (/MicroMessenger/i.test(ua)) {
        return {
            browser: 'WeChat',
            version: matchVersion(ua, /MicroMessenger\/([\d.]+)/i),
        };
    }
    if (/QQBrowser/i.test(ua)) {
        return {
            browser: 'QQBrowser',
            version: matchVersion(ua, /QQBrowser\/([\d.]+)/i),
        };
    }
    if (/UCBrowser|UCWEB/i.test(ua)) {
        return {
            browser: 'UCBrowser',
            version: matchVersion(ua, /UCBrowser\/([\d.]+)/i, /UCWEB\/([\d.]+)/i),
        };
    }
    if (/Weibo/i.test(ua)) {
        return {
            browser: 'Weibo',
            version: matchVersion(ua, /Weibo\s([\d.]+)/i),
        };
    }
    if (/Edg\//i.test(ua)) {
        return {
            browser: 'Edge',
            version: matchVersion(ua, /Edg\/([\d.]+)/i),
        };
    }
    if (/EdgA\//i.test(ua)) {
        return {
            browser: 'Edge',
            version: matchVersion(ua, /EdgA\/([\d.]+)/i),
        };
    }
    if (/OPR\/|Opera/i.test(ua)) {
        return {
            browser: 'Opera',
            version: matchVersion(ua, /OPR\/([\d.]+)/i, /Opera\/([\d.]+)/i),
        };
    }
    if (/Firefox\/|FxiOS\//i.test(ua)) {
        return {
            browser: 'Firefox',
            version: matchVersion(ua, /Firefox\/([\d.]+)/i, /FxiOS\/([\d.]+)/i),
        };
    }
    if (/Chrome\/|CriOS\//i.test(ua)) {
        return {
            browser: 'Chrome',
            version: matchVersion(ua, /Chrome\/([\d.]+)/i, /CriOS\/([\d.]+)/i),
        };
    }
    if (/Safari\//i.test(ua)) {
        return {
            browser: 'Safari',
            version: matchVersion(ua, /Version\/([\d.]+)/i),
        };
    }
    if (/MSIE |Trident\//i.test(ua)) {
        return {
            browser: 'IE',
            version: matchVersion(ua, /MSIE ([\d.]+)/i, /rv:([\d.]+)/i),
        };
    }
    return { browser: 'Unknown', version: '' };
}
function parseOs(ua) {
    if (/Windows NT/i.test(ua)) {
        const raw = matchVersion(ua, /Windows NT ([\d.]+)/i);
        const map = {
            '10.0': '10/11',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': '7',
            '6.0': 'Vista',
            '5.1': 'XP',
        };
        return {
            os: 'Windows',
            osVersion: map[raw] || raw,
            platform: 'win',
        };
    }
    if (/iPhone|iPad|iPod|iOS/i.test(ua)) {
        return {
            os: 'iOS',
            osVersion: matchVersion(ua, /OS (\d+[_.]\d+(?:[_.]\d+)?)/i),
            platform: 'ios',
        };
    }
    if (/Android/i.test(ua)) {
        return {
            os: 'Android',
            osVersion: matchVersion(ua, /Android ([\d.]+)/i),
            platform: 'android',
        };
    }
    if (/Mac OS X|Macintosh/i.test(ua)) {
        return {
            os: 'macOS',
            osVersion: matchVersion(ua, /Mac OS X ([\d_.]+)/i),
            platform: 'mac',
        };
    }
    if (/CrOS/i.test(ua)) {
        return {
            os: 'ChromeOS',
            osVersion: matchVersion(ua, /CrOS [^ ]+ ([\d.]+)/i),
            platform: 'linux',
        };
    }
    if (/Linux|X11/i.test(ua)) {
        return { os: 'Linux', osVersion: '', platform: 'linux' };
    }
    if (/Windows Phone/i.test(ua)) {
        return {
            os: 'Windows Phone',
            osVersion: matchVersion(ua, /Windows Phone OS ([\d.]+)/i),
            platform: 'win',
        };
    }
    return { os: 'Unknown', osVersion: '', platform: 'unknown' };
}
function parseDeviceType(ua, isBot) {
    if (isBot)
        return constant_1.DeviceType.BOT;
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua))
        return constant_1.DeviceType.TABLET;
    if (/Android/i.test(ua) && !/Mobile/i.test(ua))
        return constant_1.DeviceType.TABLET;
    if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile/i.test(ua)) {
        return constant_1.DeviceType.MOBILE;
    }
    if (/SmartTV|TV Safari|AppleTV|Web0S/i.test(ua))
        return constant_1.DeviceType.TV;
    if (/Watch|Wear/i.test(ua))
        return constant_1.DeviceType.WEARABLE;
    if (/Windows|Macintosh|X11|Linux|CrOS/i.test(ua))
        return constant_1.DeviceType.DESKTOP;
    return constant_1.DeviceType.UNKNOWN;
}
function parseDevice(ua = '') {
    const isBot = BOT_REGEX.test(ua);
    const { browser, version } = parseBrowser(ua);
    const { os, osVersion, platform } = parseOs(ua);
    return {
        ua,
        browser,
        browserVersion: version,
        os,
        osVersion,
        deviceType: parseDeviceType(ua, isBot),
        platform,
        isBot,
        isWechat: /MicroMessenger/i.test(ua),
    };
}
exports.parseDevice = parseDevice;
function extractDevice(req) {
    const headers = req?.headers || {};
    const ua = headers['user-agent'] || '';
    const info = parseDevice(ua);
    const clientPlatform = headers['sec-ch-ua-platform'] || headers['x-client-platform'];
    const clientBrowser = headers['x-client-browser'] || headers['sec-ch-ua-brand'];
    const clientVersion = headers['x-client-version'];
    const clientOs = headers['x-client-os'];
    const clientDeviceType = headers['x-client-device'];
    if (clientPlatform || clientBrowser || clientOs || clientDeviceType) {
        info.client = {
            name: clientBrowser ? stripQuotes(clientBrowser) : undefined,
            version: clientVersion ? stripQuotes(clientVersion) : undefined,
            platform: clientPlatform ? stripQuotes(clientPlatform) : undefined,
            os: clientOs ? stripQuotes(clientOs) : undefined,
            deviceType: clientDeviceType ? stripQuotes(clientDeviceType) : undefined,
        };
    }
    const ip = (typeof headers['x-forwarded-for'] === 'string'
        ? headers['x-forwarded-for'].split(',')[0].trim()
        : undefined) ||
        req?.ip ||
        req?.connection?.remoteAddress;
    if (ip)
        info.ip = ip;
    return info;
}
exports.extractDevice = extractDevice;
function stripQuotes(value) {
    return value.replace(/"/g, '').split(';')[0].trim();
}
function formatDevice(info) {
    const parts = [];
    if (info.browser && info.browser !== 'Unknown') {
        parts.push(info.browserVersion ? `${info.browser} ${info.browserVersion}` : info.browser);
    }
    if (info.os && info.os !== 'Unknown') {
        parts.push(info.osVersion ? `${info.os} ${info.osVersion}` : info.os);
    }
    if (info.deviceType && info.deviceType !== constant_1.DeviceType.UNKNOWN) {
        parts.push(deviceTypeLabel(info.deviceType));
    }
    return parts.length ? parts.join(' · ') : '未知设备';
}
exports.formatDevice = formatDevice;
function deviceTypeLabel(type) {
    switch (type) {
        case constant_1.DeviceType.DESKTOP:
            return '桌面端';
        case constant_1.DeviceType.MOBILE:
            return '移动端';
        case constant_1.DeviceType.TABLET:
            return '平板';
        case constant_1.DeviceType.BOT:
            return '爬虫';
        case constant_1.DeviceType.TV:
            return '电视';
        case constant_1.DeviceType.WEARABLE:
            return '穿戴设备';
        default:
            return '未知设备';
    }
}
exports.deviceTypeLabel = deviceTypeLabel;
//# sourceMappingURL=device.js.map