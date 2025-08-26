import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../store/languageSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LanguangeSelector: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLanguage = useAppSelector(state => state.language.language);

    const handleChangeLanguage = (lng: string) => {
        dispatch(changeLanguage(lng)); // Update Redux store
        i18n.changeLanguage(lng);      // Ganti bahasa di i18next
        navigate('/menu');
    };

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
                    <p className="text-xl font-bold text-black dark:text-white">{t('languange')}
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div></div>
            </div>
            <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                <div className="pb-3">
                    <p className="font-semibold text-xl text-black dark:text-white">{t('selectLanguage')}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-2xl flex flex-col gap-3 dark:bg-dark-second dark:text-white">
                    <div 
                        className={`py-2 px-3 rounded-2xl ${currentLanguage !== 'en' ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600' : ''}`}
                        onClick={currentLanguage !== 'en' ? () => handleChangeLanguage('en') : undefined}
                    >
                        <div className={`${currentLanguage === 'en' ? 'font-semibold text-color-base' : 'text-gray-800 dark:text-white'}`}>
                            English
                        </div>
                    </div>
                    <div 
                        className={`py-2 px-3 rounded-2xl ${currentLanguage !== 'id' ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600' : ''}`}
                        onClick={currentLanguage !== 'id' ? () => handleChangeLanguage('id') : undefined} 
                    >
                        <div className={`${currentLanguage === 'id' ? 'font-semibold text-color-base' : 'text-gray-800 dark:text-white'}`}>
                            Bahasa Indonesia
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguangeSelector;