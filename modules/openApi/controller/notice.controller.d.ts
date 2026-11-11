import { SuccessModal } from '../../../Model/Response.modal';
import { OpenApiNoticeService } from '../service/notice.service';
export declare enum noticeType {
    QMSG = "qmsg",
    SERVER_CHAIN = "serverchain",
    PUSH_PLUS = "pushplus",
    PUSH_PLUS_HXTRIP = "pushplushxtrip",
    DING_TALK = "dingtalk",
    WECOM = "wecom",
    BARK = "bark",
    GO_CQHTTP = "gocqhttp",
    PUSH_DEER = "pushdeer",
    IGOT = "igot",
    TELEGRAM = "telegram"
}
export declare class NoticeParamsDto {
    type: string;
    token: string;
    content: string;
    title?: string;
}
export declare class NoticeGetParamsDto extends NoticeParamsDto {
}
export declare class NoticePostParamsDto extends NoticeParamsDto {
}
export declare class OpenApiNoticeController {
    private readonly noticeService;
    constructor(noticeService: OpenApiNoticeService);
    getNotice(query: NoticeGetParamsDto): Promise<SuccessModal>;
    postNotice(body: NoticePostParamsDto): Promise<SuccessModal>;
}
