export interface ApiRes<T> {
    data: T;
    message: string;
}

export interface LoginReq {
    nik: string;
    password: string
}

export interface User {
    nik: number;
    pass: string;
    email: string;
}

export interface LoginRes {
    userData: User;
    token: string;
}

export interface RegisterReq {
    nik: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPassRes {
    message: string;
}

export interface ForgotPassReq {
    email: string;
}

export interface ResetPassRes {
    message: string;
}

export interface ResetPassReq {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface verificationReq {
    token: string
}

export interface verificationRes {
    message: string
}