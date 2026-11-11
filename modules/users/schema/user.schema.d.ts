import * as mongoose from 'mongoose';
export declare class UserPreference {
    editorTheme: string;
    mode: string;
    timelineGroupBy: string;
    calendarStartDay: number;
}
export declare const UserPreferenceSchema: mongoose.Schema<UserPreference, mongoose.Model<UserPreference, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserPreference>;
export declare class User {
    userName: string;
    nickName: string;
    avatar: string;
    desc: string;
    link: string;
    email: string;
    password: string;
    homePath: string;
    status: string;
    speakToken: string;
    githubId: string;
    activeTheme: string;
    preference: UserPreference;
    lastDevice: any;
    lastLoginAt: Date;
}
export type UserDocument = User & mongoose.Document;
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
