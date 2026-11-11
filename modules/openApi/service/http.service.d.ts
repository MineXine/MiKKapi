import { HttpService } from '@nestjs/axios';
export declare class OpenApiHttpService {
    private readonly httpService;
    constructor(httpService: HttpService);
    requestCors(url: string): Promise<any>;
}
