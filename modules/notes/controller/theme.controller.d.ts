import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { ThemeService } from '../service/theme.service';
import { UserService } from '../../users/services/user.service';
export declare class ThemeController {
    private readonly themeService;
    private readonly userService;
    constructor(themeService: ThemeService, userService: UserService);
    list(req: any): Promise<SuccessModal>;
    create(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    activate(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    update(param: any, body: any, req: any): Promise<SuccessModal | ErrorModal>;
    remove(param: any, req: any): Promise<SuccessModal | ErrorModal>;
}
