import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { MdcService } from '../service/mdc.service';
export declare class MdcController {
    private readonly mdcService;
    constructor(mdcService: MdcService);
    list(req: any): Promise<SuccessModal>;
    upsert(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    remove(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    render(body: any, req: any): Promise<SuccessModal>;
    preview(body: any): Promise<SuccessModal>;
}
