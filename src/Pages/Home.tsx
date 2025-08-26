import { Banknote, Bus, Download, Eye, EyeOff, FileText, Info, LayoutGrid, User, UserCheck, WalletMinimal } from "lucide-react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import { usePostProfileMutation } from "../services/apiProfile";
import { usePostSalaryMutation } from "../services/apiSalary";
import { useAppSelector } from "../store";

const Home: FC = () => {
    const [salaryVisible, setSalaryVisible] = useState(false);
    const [salary, {data: salaryData}] = usePostSalaryMutation();
    const [profile, {data: profileData, isLoading}] = usePostProfileMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const date = moment().format("YYYY-MM-DD");
    const date2 = moment().format("YYYY-MM-22");
    const month = moment().format("MM");
    const year = moment().format("YYYY");
    const lastMonth = moment().subtract(1, 'month').format("MM");
    const lastYear = moment().subtract(1, 'year').format("YYYY");
    const dataUser = useAppSelector(state => state.auth.userInfo);
    const nameParts = profileData?.data?.nama?.split(" ");
    const username = nameParts?.slice(0, 2).join(' ');
    const monthFix = (date <= date2) ? lastMonth : month;
    const referenceDate = moment().format("YYYY-01-22"); 
    const yearFix = (date <= referenceDate) ? lastYear : year;

    const pdfUrl = `https://app.sknmedical.co.id/skn/audi/dataku-v2-bes/gaji_pdf.php?nik=${dataUser?.nik}|${dataUser?.pass}|${monthFix}-${year}`;
    
    useEffect(() => {
        profile({
            nik: dataUser?.nik,
        });

        salary({
            nik: dataUser?.nik,
            month: monthFix,
            year: yearFix
        });
    }, [profile, salary, dataUser?.nik, monthFix, yearFix]);

    //console.log("month: ", monthFix, "year: ", yearFix);
    
    const tonggleSalaryVisible = () => {
        setSalaryVisible(!salaryVisible);
    }

    const handlePdfViewer = () => {
        navigate('pdf-viewer', {state: {pdfUrl}});
    }

    // const profile = require(`../Assets/Images/profile.jpg`);

    return (
        <div>
            <div className="sticky top-0 left-0 right-0 bg-white p-5 md:mx-20 lg:mx-48 flex justify-between items-center lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                <div className="flex gap-3">
                    <div>
                        {isLoading ? (
                            <div className="flex flex-col">
                                <div className="w-[200px] h-5 rounded-xl animate-pulse bg-gray-200 mb-2 dark:bg-dark-second"></div>
                                <div className="w-[100px] h-5 rounded-xl animate-pulse bg-gray-200 mb-2 dark:bg-dark-second"></div>
                            </div>    
                        ) : (
                            <div>
                                <p className="font-semibold text-xl text-black dark:text-white">Hi, {username}</p>
                                <p className="font-semibold text-gray-400 text-sm">{t('welcome')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:flex md:justify-between md:gap-3">
                    {/* <div 
                        onClick={toggleTheme}
                        className="bg-gray-100 p-3 rounded-xl cursor-pointer dark:text-white dark:bg-dark-second"
                    >
                        {isDarkMode 
                        ? ( <Sun/> ) 
                        : ( <Moon/> )}
                    </div> */}
                    <div 
                        className="hidden md:block bg-gray-100 p-3 rounded-xl cursor-pointer dark:text-white dark:bg-dark-second"
                        onClick={() => navigate('/menu')}
                    >
                        <LayoutGrid/>
                    </div>
                </div>
            </div>
            <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                <div className="relative mt-5">
                    <div className="bg-[url('https://wallpapercave.com/wp/wp9587304.jpg')] absolute inset-0 bg-cover bg-center w-full p-5 rounded-2xl"></div>
                    <div className="bg-black/20 absolute inset-0 rounded-2xl"></div>
                    <div className="relative p-5 z-10">
                        <div className="flex items-center gap-2 text-white">
                            <WalletMinimal />
                            <p className="text-sm">{t('yourSalary')}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <p 
                                className="text-2xl font-bold text-white"
                            >Rp {salaryVisible ? salaryData?.salary.toLocaleString("id-ID") ?? '-' : '-'}</p>
                            <div onClick={tonggleSalaryVisible}>
                                {salaryVisible 
                                ? <EyeOff className="text-white cursor-pointer"/> 
                                : <Eye className="text-white cursor-pointer"/>}
                            </div>
                        </div>
                        <div className="flex items-center mt-5 gap-3">
                            <button
                                className="bg-black opacity-80 text-white py-3 px-4 rounded-xl cursor-pointer hover:opacity-70"
                                onClick={() => navigate('/salary')}
                            >
                                Check Detail
                            </button>
                            <div 
                                className="bg-black opacity-80 text-white p-3 rounded-xl cursor-pointer hover:opacity-70"
                                onClick={handlePdfViewer}
                            >
                                <Download/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="bg-gray-100 w-full p-5 rounded-2xl dark:bg-dark-second">
                        <div>
                            <p className="font-semibold text-lg text-gray-500 dark:text-white">{t('services')}</p>
                        </div>
                        <div className="mt-3 grid place-items-center grid-cols-4 md:grid-cols-6 gap-5">
                            <div className="flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/attendance')}
                                >
                                    <UserCheck/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('attendance')}</p>
                            </div>
                            <div className="flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/salary')}
                                >
                                    <Banknote/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('salary')}</p>
                            </div>
                            <div className="flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/leave')}
                                >
                                    <Bus/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('leave')}</p>
                            </div>
                            <div className="hidden md:block md:flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/report')}
                                >
                                    <FileText/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('report')}</p>
                            </div>
                            <div className="hidden md:block md:flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/profile')}
                                >
                                    <User/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('profile')}</p>
                            </div>
                            <div className="flex flex-col items-center gap-1 w-fit">
                                <div 
                                    className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer hover:bg-blue-600"
                                    onClick={() => navigate('/about')}
                                >
                                    <Info/>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-white">{t('about')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert />
        </div>
    )
}

export default Home;