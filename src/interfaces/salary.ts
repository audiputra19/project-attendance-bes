export interface SalaryRes {
    salary: number;
    no_rek: string;
}

export interface SalaryReq {
    nik: number | undefined;
    month: string;
    year: string;
}