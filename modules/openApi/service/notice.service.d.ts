import { HttpService } from '@nestjs/axios';
export declare class OpenApiNoticeService {
    private readonly httpService;
    constructor(httpService: HttpService);
    sendNotice(type: string, token: string, content: string, title: string): Promise<any>;
}
