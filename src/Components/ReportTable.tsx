import moment from "moment-timezone";
import { FC } from "react";
import { ListReportRes } from "../interfaces/report";

interface ReportTableProps {
    reportData: ListReportRes[] | undefined;
}

export const ReportTable: FC<ReportTableProps> = ({ reportData }) => {

    const total = reportData?.reduce((acc, data) => {
        acc.hadir += data.hadir || 0;
        acc.alpa += data.alpa || 0;
        acc.telat += data.telat || 0;
        acc.sakit += data.sakit || 0;
        acc.izin += data.izin || 0;
        acc.cuti += data.cuti || 0;
        return acc;
    }, {
        hadir: 0,
        alpa: 0,
        telat: 0,
        sakit: 0,
        izin: 0,
        cuti: 0
    });

    return (
        <div className="w-full border border-gray-200 rounded-xl dark:bg-dark-main dark:text-white dark:border-dark-second">
            <div className="overflow-x-auto rounded-xl max-h-[400px] scrollbar-hidden">
                <table className="table">
                    <thead className="bg-gray-50 sticky top-0 dark:bg-dark-second">
                        <tr className="text-sm text-gray-700 border-gray-200 font-semibold dark:text-white dark:border-dark-second">
                            <td><center>No</center></td>
                            <td><center>Tanggal</center></td>
                            <td><center>Hadir</center></td>
                            <td><center>Alpa</center></td>
                            <td><center>Telat</center></td>
                            <td><center>Sakit</center></td>
                            <td><center>Izin</center></td>
                            <td><center>Cuti</center></td>
                            <td><center>Keterangan</center></td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData?.map((data: ListReportRes, i: number) => {
                            const date = moment(data.tanggal).tz('Asia/Jakarta').format('DD-MM-YYYY');
                            
                            return (
                                <tr 
                                    key={i}
                                    className="text-xs border-gray-200 text-black hover:bg-gray-50 dark:border-dark-second dark:hover:bg-dark-second dark:text-white"
                                >
                                    <td><center>{i + 1}</center></td>
                                    <td className="w-28"><center>{date}</center></td>
                                    <td><center>{data.hadir}</center></td>
                                    <td><center>{data.alpa}</center></td>
                                    <td><center>{data.telat}</center></td>
                                    <td><center>{data.sakit}</center></td>
                                    <td><center>{data.izin}</center></td>
                                    <td><center>{data.cuti}</center></td>
                                    <td><center>{data.keterangan}</center></td>
                                </tr>                            
                            )
                        })}
                    </tbody>
                    <tfoot className="bg-gray-50 sticky bottom-0 dark:bg-dark-second">
                        <tr className="text-sm text-gray-700 border-gray-200 font-semibold dark:text-white dark:border-dark-second">
                            <td colSpan={2}><center>Total</center></td>
                            <td><center>{total?.hadir}</center></td>
                            <td><center>{total?.alpa}</center></td>
                            <td><center>{total?.telat}</center></td>
                            <td><center>{total?.sakit}</center></td>
                            <td><center>{total?.izin}</center></td>
                            <td><center>{total?.cuti}</center></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}