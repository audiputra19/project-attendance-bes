export interface MainReportReq {
    nik: number | undefined;
    startDate: Date;
    endDate: Date;
}

export interface MainReportProps {
    hadir: number;
    alpa: number;
    telat: number;
    sakit: number;
    izin: number;
    cuti: number;
}

export interface MainReportRes {
    data: MainReportProps;
}

export interface ListReportReq {
    nik: number | undefined;
    startDate: Date;
    endDate: Date;
}

export interface ListReportRes {
    tanggal: string;
    hadir: number;
    alpa: number;
    telat: number;
    sakit: number;
    izin: number;
    cuti: number;
    keterangan: string;
}