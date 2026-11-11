import * as mongoose from 'mongoose';
export declare class MdcComponent {
    name: string;
    title: string;
    description: string;
    props: any[];
    slot: boolean;
    global: boolean;
    enabled: boolean;
    icon: string;
    user: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MdcComponentSchema: mongoose.Schema<MdcComponent, mongoose.Model<MdcComponent, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MdcComponent>;
