import moment from "moment";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store";

const LiveClock: React.FC = () => {
    const [time, setTime] = useState({
        hours: moment().format("HH"),
        minutes: moment().format("mm"),
        seconds: moment().format("ss"),
    });
    const { t, i18n } = useTranslation();
    const currentLanguage = useAppSelector(state => state.language.language);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [i18n, currentLanguage]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime({
                hours: moment().format("HH"),
                minutes: moment().format("mm"),
                seconds: moment().format("ss"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex w-full justify-center gap-5">
            <div className="flex justify-center items-center bg-gray-100 w-20 h-20 text-2xl font-semibold rounded-2xl dark:bg-dark-second">
                <div className="flex flex-col items-center gap-1 text-black dark:text-color-base">
                    {time.hours}
                    <p className="text-xs font-semibold">{t('hours')}</p>
                </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 w-20 h-20 text-2xl font-semibold rounded-2xl dark:bg-dark-second">
                <div className="flex flex-col items-center gap-1 text-black dark:text-color-base">
                    {time.minutes}
                    <p className="text-xs font-semibold">{t('minutes')}</p>
                </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 w-20 h-20 text-2xl font-semibold rounded-2xl dark:bg-dark-second">
                <div className="flex flex-col items-center gap-1 text-black dark:text-color-base">
                    {time.seconds}
                    <p className="text-xs font-semibold">{t('seconds')}</p>
                </div>
            </div>
        </div>
    );
};

export default LiveClock;
