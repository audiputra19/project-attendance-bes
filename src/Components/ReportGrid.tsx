import { AlarmClock, Bus, ClipboardCheck, ClipboardX, PhoneOutgoing, ThermometerSun } from "lucide-react";
import { FC } from "react";
import { MainReportProps } from "../interfaces/report";
import { useTranslation } from "react-i18next";

interface ReportGridProps {
    reportData: MainReportProps | undefined;
}

export const ReportGrid: FC<ReportGridProps> = ({ reportData }) => {

    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <ClipboardCheck size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('present')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.hadir}</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <ClipboardX size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('alpa')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.alpa}</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <AlarmClock size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('late')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.telat}</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <ThermometerSun size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('sick')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.sakit}</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <PhoneOutgoing size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('permit')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.izin}</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-3xl dark:bg-dark-second">
                <div>
                    <div className="p-3 bg-white w-fit rounded-full text-black dark:bg-dark-main dark:text-white">
                        <Bus size={24}/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                    <p className="font-semibold text-black dark:text-white">{t('leave')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {reportData?.cuti}</p>
                </div>
            </div>
        </div>
    )
}