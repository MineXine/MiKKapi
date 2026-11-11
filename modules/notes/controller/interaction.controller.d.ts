import { ErrorModal, SuccessModal } from '../../../Model/Response.modal';
import { LikeService } from '../service/like.service';
import { FavoriteService } from '../service/favorite.service';
import { ShareService } from '../service/share.service';
import { IspeakService } from '../../ispeak/service/ispeak.service';
export declare class InteractionController {
    private readonly likeService;
    private readonly favoriteService;
    private readonly shareService;
    private readonly ispeakService;
    constructor(likeService: LikeService, favoriteService: FavoriteService, shareService: ShareService, ispeakService: IspeakService);
    like(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    unlike(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    myLikes(req: any): Promise<SuccessModal>;
    likeStatus(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    favorite(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    unfavorite(param: any, req: any): Promise<SuccessModal | ErrorModal>;
    favoriteList(query: any, req: any): Promise<SuccessModal>;
    favoriteFolders(req: any): Promise<SuccessModal>;
    share(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    shareStats(param: any): Promise<SuccessModal | ErrorModal>;
    shareList(param: any, query: any): Promise<SuccessModal | ErrorModal>;
}
