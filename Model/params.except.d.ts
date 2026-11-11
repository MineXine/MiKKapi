import { HttpException } from '@nestjs/common';
export declare class ParamsLostException extends HttpException {
    constructor(objectOrError: any, description: string, status?: number);
}
