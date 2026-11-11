import { HttpService } from '@nestjs/axios';
export declare class OauthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    githubLogin(code: string): Promise<Record<string, string>>;
    getUserInfoByGithubToken(access_token: string): Promise<any>;
}
