import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
export declare class IndexBootstrapService implements OnApplicationBootstrap {
    private readonly ispeakModel;
    constructor(ispeakModel: Model<any>);
    onApplicationBootstrap(): Promise<void>;
}
