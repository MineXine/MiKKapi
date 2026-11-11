import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { DraftService } from '../service/draft.service';
export declare class DraftController {
    private readonly draftService;
    constructor(draftService: DraftService);
    autosave(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    list(query: any, req: any): Promise<SuccessModal>;
    findOne(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    remove(param: any, req: any): Promise<SuccessModal>;
    purge(body: any, req: any): Promise<SuccessModal>;
}
