import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { IspeakTagService } from '../service/ispeakTag.service';
export declare class IspeakTagController {
    private readonly ispeakTagService;
    constructor(ispeakTagService: IspeakTagService);
    getAllTag(query: any, req: any): Promise<SuccessModal>;
    getTagsByUserId(query: any): Promise<SuccessModal>;
    getTagOverview(query: any, req: any): Promise<SuccessModal>;
    getIspeakTagByPage(query: any, req: any): Promise<SuccessModal>;
    addTag(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateIspeakTag(body: any): Promise<SuccessModal | ErrorModal>;
    deleteIspeakTag(param: any, req: any): Promise<SuccessModal | ErrorModal>;
}
