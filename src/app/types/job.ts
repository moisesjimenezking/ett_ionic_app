import { UserModel } from "./user";

export interface JobModel {
    amount: string;
    appliedIcon: string;
    appliedJobs: any[] | null;
    appliedUser: boolean;
    bookmark: boolean;
    datetime: string;
    datetime_update: string;
    description: string;
    id: number;
    listApplied: number;
    location: string;
    requeriment: string[];
    title: string;
    type_time: string;
    user: UserModel;
    user_id: number;
}
