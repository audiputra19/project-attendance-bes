import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DatePickerInput from "../Components/DatePicker";
import { LeaveCategory } from "../Components/LeaveCategory";
import Loading from "../Components/Loading";
import { NotFound } from "../Components/NotFound";
import { ReportGrid } from "../Components/ReportGrid";
import { ReportTable } from "../Components/ReportTable";
import { useAlert } from "../Context/AlertContext";
import { MainReportProps } from "../interfaces/report";
import { useListReportMutation, useMainReportMutation } from "../services/apiReport";
import { useAppSelector } from "../store";

const ReportAttendance: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const navigate = useNavigate();
    const [postReport, {data, isLoading, isSuccess, error}] = useMainReportMutation();
    const [listReport, {data: listdataReport}] = useListReportMutation();
    const userData = useAppSelector(state => state.auth.userInfo);
    const nik = userData?.nik;
    const [report, setReport] = useState<MainReportProps>();
    const { showAlert } = useAlert();
    const { t } = useTranslation();
    const [categories] = useState<string[]>(['Table']);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleSubmit = () => {
        if(startDate && endDate) {
            postReport({startDate, endDate, nik});
            listReport({startDate, endDate, nik});
        } else {
            showAlert('Periode harus diisi');
        }
    }

    useEffect(() => {
        if(isSuccess && data) {
            setReport(data.data);
        } else if (error){
            const message = (error as any)?.data?.message;
            showAlert(message);
        }
    }, [isSuccess, data, error, showAlert]);

    return (
        isLoading ? (
            <Loading/>
        ) : (
            <div className="min-h-screen bg-white dark:bg-dark-main">
                <div className="sticky z-20 top-0 left-0 right-0 bg-white flex justify-between items-center p-5 md:mx-20 lg:mx-48 lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                    <div
                        className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft/>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-xl font-bold text-black dark:text-white">{t('report')}
                            <span className="text-color-base pl-1 text-4xl">.</span>
                        </p>
                    </div>
                    <div></div>
                </div>
                <div className="p-5 sm:mx-10 md:mx-32 lg:mx-80">
                    <div className="flex justify-center gap-3 w-full">
                        <DatePickerInput selectedDate={startDate} onDateChange={setStartDate}/>
                        <DatePickerInput selectedDate={endDate} onDateChange={setEndDate}/>
                    </div>
                    <div className="mt-5">
                        <button 
                            type="submit"
                            className="w-full px-5 py-4 bg-color-base text-white rounded-xl font-bold hover:bg-color-baseHover"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="mt-10">
                        <p className="font-semibold text-xl text-black dark:text-white">{t('myReport')}</p>
                    </div> 

                    {!data ? (
                        <NotFound/>
                    ) : ( 
                        <div>
                            <div className="mt-5">
                                <LeaveCategory
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                            </div>
                            <div className="mt-5">
                                {selectedCategory === 'Table' ? (
                                    <ReportTable reportData={listdataReport}/>
                                ) : selectedCategory === '' ? (
                                    <ReportGrid reportData={report}/>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    )
}

export default ReportAttendance;