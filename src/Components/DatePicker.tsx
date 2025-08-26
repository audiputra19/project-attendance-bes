import { CalendarDays } from "lucide-react";
import { FC, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store";

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}
const DatePickerInput: FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = useAppSelector(state => state.language.language);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [i18n, currentLanguage]);

    return (
        <div>
            <div className="">
                <div className="absolute z-10 text-gray-500 p-4 dark:text-white">
                    <CalendarDays/>
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={onDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full pl-14 pr-4 py-4 text-gray-500 outline-none rounded-xl bg-gray-100 dark:bg-dark-second dark:text-white"
                    placeholderText={t('selectDate')}
                    popperPlacement="bottom-start"
                />
            </div>
        </div>
    )
}

export default DatePickerInput;