export declare enum NoteVisibility {
    PUBLIC = "public",
    PRIVATE = "private"
}
export declare enum NoteStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare enum LegacyNoteType {
    PUBLIC = "0",
    REQUIRE_LOGIN = "1",
    PRIVATE = "2"
}
export declare enum ContentFormat {
    MARKDOWN = "markdown",
    HTML = "html",
    PLAIN = "plain"
}
export declare enum AttachmentKind {
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    FILE = "file"
}
export declare enum ViewType {
    TIMELINE = "timeline",
    TAG = "tag",
    SEARCH = "search",
    CALENDAR = "calendar",
    MAP = "map",
    GALLERY = "gallery",
    CUSTOM = "custom"
}
export declare enum ViewSort {
    CREATED_DESC = "created_desc",
    CREATED_ASC = "created_asc",
    UPDATED_DESC = "updated_desc",
    UPDATED_ASC = "updated_asc",
    LIKE_DESC = "like_desc",
    TITLE_ASC = "title_asc"
}
export declare enum ShareChannel {
    LINK = "link",
    COPY = "copy",
    WECHAT = "wechat",
    WEIBO = "weibo",
    QQ = "qq",
    TELEGRAM = "telegram",
    EMAIL = "email",
    QRCODE = "qrcode"
}
export declare enum DeviceType {
    DESKTOP = "desktop",
    MOBILE = "mobile",
    TABLET = "tablet",
    BOT = "bot",
    TV = "tv",
    WEARABLE = "wearable",
    UNKNOWN = "unknown"
}
export declare enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto",
    SEPIA = "sepia",
    CUSTOM = "custom"
}
export declare enum StorageDriver {
    BASE64 = "base64",
    LOCAL = "local",
    URL = "url"
}
