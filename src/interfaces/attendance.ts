export interface AttendanceRes {
    message: string;
}

export interface AttendanceReq {
    latitude: number;
    longitude: number;
    nik: number | undefined;
}

export interface TimeAttendanceProps {
    masuk: string;
    istKeluar: string;
    istMasuk: string;
    keluar: string;
    telat: number;
    telatIst: number;
    alpa: number;
}

export interface TimeAttendanceRes {
    data: TimeAttendanceProps;
}

export interface TimeAttendanceReq {
    nik: number | undefined;
}