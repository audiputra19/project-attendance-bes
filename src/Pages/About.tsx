import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const About: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    <p className="text-xl font-bold text-black dark:text-white">{t('about')}
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div></div>
            </div>
            <div className="p-5 mx-5 sm:mx-12 md:mx-32 lg:mx-80">
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="text-3xl font-bold text-black dark:text-white">{t('headerAbout')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('version')}</p>
                        <p className="text-lg text-black dark:text-white">1.0.0</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-white">{t('bodyAbout')}</p>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 mb-5">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('from')}</p>
                        <p className="text-lg text-black font-bold dark:text-white">A.P</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;