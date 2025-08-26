import { ArrowLeft, Download, Eye, EyeOff, WalletMinimal } from "lucide-react";
import moment from "moment";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { NotFound } from "../Components/NotFound";
import YearMonthPicker from "../Components/YearMonthPicker";
import { useDateContext } from "../Context/DateContext";
import { usePostSalaryMutation } from "../services/apiSalary";
import { useAppSelector } from "../store";

const Salary: FC = () => {
    const navigate = useNavigate();
    const [salary, {data, isLoading, error}] = usePostSalaryMutation();
    const [salaryVisible, setSalaryVisible] = useState(true);
    const { selectedDate } = useDateContext();
    const { t } = useTranslation();
    const month = moment(selectedDate).format("MM");
    const year = moment(selectedDate).format("YYYY");
    const dataUser = useAppSelector(state => state.auth.userInfo);
    const pdfUrl = `https://app.sknmedical.co.id/skn/audi/dataku-v2-bes/gaji_pdf.php?nik=${dataUser?.nik}|${dataUser?.pass}|${month}-${year}`;

    if(error){
        console.error('Error:', error);
    }
    
    //console.log(data);
    const tonggleSalaryVisible = () => {
        setSalaryVisible(!salaryVisible);
    }

    const handlePdfViewer = () => {
        navigate('/pdf-viewer', {state: {pdfUrl}});
    }

    const handleSubmit = async () => {
        try {
            await salary({
                nik: dataUser?.nik,
                month,
                year
            })

        } catch (error) {
            console.error("Error:", error)
        }
    }

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
                        <p className="text-xl font-bold dark:text-white">{t('salary')}
                            <span className="text-color-base pl-1 text-4xl">.</span>
                        </p>
                    </div>
                    <div></div>
                </div>
                <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                    <div className="flex gap-3">
                        <div className="relative z-50">
                            <YearMonthPicker/>
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full px-5 py-4 bg-color-base text-white rounded-xl font-bold hover:bg-color-baseHover"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="font-semibold text-xl text-black dark:text-white">{t('mySalary')}</p>
                    </div> 
                    {!data ? (
                        <NotFound/>
                    ) : (
                        <>
                            <div className="relative mt-5">
                                <div className="bg-color-base absolute inset-0 bg-cover bg-center w-full p-5 rounded-2xl"></div>
                                <div className="bg-black/20 absolute inset-0 rounded-2xl"></div>
                                <div className="relative p-5 z-10">
                                    <div className="flex items-center gap-2 text-white">
                                        <WalletMinimal />
                                        <p className="text-sm">{t('yourSalary')}</p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <p 
                                            className="text-2xl font-bold text-white"
                                        >Rp {salaryVisible ? data.salary.toLocaleString("id-ID") ?? '-' : '-'}</p>
                                        <div onClick={tonggleSalaryVisible}>
                                            {salaryVisible 
                                            ? <EyeOff className="text-white cursor-pointer"/> 
                                            : <Eye className="text-white cursor-pointer"/>}
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-10 gap-10">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs font-semibold text-gray-300">No. Rek</p>
                                            <p className="text-sm text-white">{data.no_rek}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs font-semibold text-gray-300">Periode</p>
                                            <p className="text-sm text-white">{`${month}/${year}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center gap-2">
                                        <div 
                                            className="bg-gray-100 p-4 rounded-xl cursor-pointer w-fit text-black dark:text-white dark:bg-dark-second"
                                            onClick={handlePdfViewer}
                                        >
                                            <Download/>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-white">Pdf</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    )
}

export default Salary;