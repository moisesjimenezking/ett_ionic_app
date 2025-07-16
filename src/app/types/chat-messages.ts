export interface ChatMessage {
    datetime: string;
    datetime_ia: null;
    datetime_update: string;
    ia: number;
    id: number;
    lastMsg: string;
    lastMsgTime: string;
    messages: Message[];
    sourceImage: null;
    sourceName: string;
    unreadMsgCount: number;
    user_recept: User;
    user_recept_id: number;
    user_sending: User;
    user_sending_id: number;
}


export interface Message {
    chats_id: number;
    datetime: string;
    datetime_update: null;
    id: number;
    isSender: boolean;
    message: string;
    user_id: number;
    view: number;
}

export interface User {
    about: null;
    account: string;
    address: null;
    allergies: null;
    birthdate: null;
    blood_type: null;
    civil_status: null;
    datetime: string;
    datetime_update: null | string;
    email: string;
    experience: null;
    family_responsibilities: number;
    fullname: string;
    icon: null;
    icon_front: null;
    id: number;
    identification: null;
    level_study: null;
    license: null | string;
    location: null;
    passwd: string;
    phone: string;
    rif: null;
    sex: null;
    skills: any[];
    social_link: any[];
    specialization: null;
    verified_email: boolean;
}
