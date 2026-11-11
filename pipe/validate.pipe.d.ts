export declare class ValidationPipe {
    transform(value: any, { metatype }: any): Promise<any>;
    toValidate(metatype: any): boolean;
}
