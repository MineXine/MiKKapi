import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { ViewService } from '../service/view.service';
export declare class ViewController {
    private readonly viewService;
    constructor(viewService: ViewService);
    list(req: any): Promise<SuccessModal>;
    create(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    update(param: any, body: any, req: any): Promise<SuccessModal | ErrorModal>;
    remove(param: any, req: any): Promise<SuccessModal | ErrorModal>;
}
