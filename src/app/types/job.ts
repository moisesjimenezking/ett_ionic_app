import { UserModel } from "./user";

export interface JobModel {
    amount: string;
    appliedIcon: string;
    appliedJobs: CandidateModel[] | null;
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

export interface CandidateModel {
    datetime: string;
    datetime_update: null;
    id: number;
    jobs_id: number;
    status_id: string;
    user: UserModel;
    user_id: number;
}
