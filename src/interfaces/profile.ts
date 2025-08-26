export interface ProfileProps {
    nik: number;
    nama: string;
    gender: string;
    alamat: string;
    nohp: string;
    tgl_lahir: string;
    tgl_masuk: string;
    st_kerja: string;
    jabatan: string;
    pendidikan: string;
    status: string;
    divisi: string;
    no_rek: string;
    email: string;
}

export interface ProfileRes {
    data: ProfileProps;
}

export interface ProfileReq {
    nik: number | undefined;
}