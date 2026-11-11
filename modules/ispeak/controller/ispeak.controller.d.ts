import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { TokenService } from '../../users/services/token.service';
import { IspeakService } from '../service/ispeak.service';
export declare class IspeakController {
    private readonly ispeakService;
    private readonly tokenService;
    constructor(ispeakService: IspeakService, tokenService: TokenService);
    getSpeakByPage(req: any, query: any): Promise<SuccessModal | ErrorModal>;
    getIspeakByPage(query: any, req: any): Promise<SuccessModal>;
    addOneSpeak(req: any, body: any): Promise<SuccessModal>;
    addOneSpeakByToken(body: any): Promise<SuccessModal | ErrorModal>;
    updateSpeak(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateSpeakStatus(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    deleteOneSpeak(param: any): Promise<SuccessModal | ErrorModal>;
    getOneSpeak(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateVisibility(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateShare(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    getSharedNote(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    getTimeline(query: any, req: any): Promise<SuccessModal>;
    getCalendar(query: any, req: any): Promise<SuccessModal>;
    getMap(query: any, req: any): Promise<SuccessModal>;
    search(query: any, req: any): Promise<SuccessModal | ErrorModal>;
    getArchived(query: any, req: any): Promise<SuccessModal>;
    archive(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    restore(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    getStats(req: any): Promise<SuccessModal>;
    private buildNotePayload;
    private maskItem;
}
