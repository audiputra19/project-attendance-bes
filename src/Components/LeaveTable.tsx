import { FC } from "react";
import { leaveProps, reportLeaveProps } from "../interfaces/leave";
import moment from "moment-timezone";

interface LeaveTableProps {
    leaveData: reportLeaveProps[] | undefined;
    isLoading: boolean;
}

export const LeaveTable: FC<LeaveTableProps> = ({ leaveData, isLoading }) => {

    return (
        <div className="w-full border border-gray-200 rounded-xl dark:bg-dark-main dark:text-white dark:border-dark-second">
            <div className="overflow-x-auto rounded-xl max-h-[400px] scrollbar-hidden">
                <table className="table">
                    <thead className="bg-gray-50 sticky top-0 dark:bg-dark-second">
                        <tr className="text-sm text-gray-700 border-gray-200 font-semibold dark:text-white dark:border-dark-second">
                            <td><center>No</center></td>
                            <td><center>Tanggal</center></td>
                            <td><center>Keterangan</center></td>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveData?.map((data: reportLeaveProps, i: number) => {
                            const date = moment(data.tanggal).tz('Asia/Jakarta').format('DD-MM-YYYY');
                            return (
                                <tr 
                                    key={i}
                                    className="text-xs border-gray-200 text-black hover:bg-gray-50 dark:border-dark-second dark:hover:bg-dark-second dark:text-white"
                                >
                                    <td><center>{i + 1}</center></td>
                                    <td className="w-28"><center>{date}</center></td>
                                    <td>{data.keterangan}</td>
                                </tr>                            
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}