export declare class ResponseModal {
    data: any;
    message: string;
    type: string;
    code: number;
    constructor(data: any);
    success(message: string, type?: string): this;
    error(message: string, code?: number): this;
}
export declare class SuccessModal extends ResponseModal {
    constructor(data: any, message?: string, type?: string);
}
export declare class ErrorModal extends ResponseModal {
    constructor(data: any, message: string, code?: number);
}
