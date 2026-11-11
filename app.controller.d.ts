import { AppService } from './app.service';
import { SuccessModal } from './Model/Response.modal';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): Promise<SuccessModal>;
}
