import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiHttpController {
    private readonly openApiHttpService;
    constructor(openApiHttpService: OpenApiHttpService);
    requestCors(query: any, res: any): Promise<any>;
}
