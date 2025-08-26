import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LeaveCategory } from "../Components/LeaveCategory";
import { LeaveTable } from "../Components/LeaveTable";
import { useAppSelector } from "../store";
import { usePostLeaveMutation, usePostReportLeaveMutation } from "../services/apiLeave";
import { LeaveGrid } from "../Components/LeaveGrid";

const Leave: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [leave, {data, isLoading}] = usePostLeaveMutation();
    const [report, {data: dataReport, isLoading: isLoadingReport}] = usePostReportLeaveMutation();
    const userData = useAppSelector(state => state.auth.userInfo);
    const leaveData = data?.data;
    const leaveReport = dataReport?.data;
    const [categories] = useState<string[]>(['Table']);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    
    useEffect(() => {
        leave({ nik: userData?.nik });
        report({ nik: userData?.nik });
    }, [leave, report, userData?.nik]);

    return (
        <div className="min-h-screen bg-white dark:bg-dark-main">
            <div className="sticky z-20 top-0 left-0 right-0 bg-white flex justify-between items-center p-5 md:mx-20 lg:mx-48 lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                <div
                    className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft/>
                </div>
                <div className="hidden lg:block">
                    <p className="text-xl font-bold text-black dark:text-white">{t('leave')}
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div></div>
            </div>
            <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                <div className="mt-5">
                    <p className="font-semibold text-xl text-black dark:text-white">{t('myLeave')}</p>
                </div>
                <div className="mt-5">
                    <LeaveCategory
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
                <div className="mt-5">
                    {selectedCategory === 'Table' ? (
                        <LeaveTable leaveData={leaveReport} isLoading={isLoadingReport}/>
                    ) : selectedCategory === '' ? (
                        <LeaveGrid leaveData={leaveData} isLoading={isLoading}/>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Leave;