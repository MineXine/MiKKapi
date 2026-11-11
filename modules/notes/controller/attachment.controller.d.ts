import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { AttachmentService } from '../service/attachment.service';
export declare class AttachmentController {
    private readonly attachmentService;
    constructor(attachmentService: AttachmentService);
    upload(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    list(query: any, req: any): Promise<SuccessModal>;
    bind(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    remove(param: any, req: any): Promise<SuccessModal | ErrorModal>;
}
