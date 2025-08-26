import { CalendarDays } from 'lucide-react';
import { FC, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { useDateContext } from '../Context/DateContext';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store';

const YearMonthPicker: FC = () => {
  const {selectedDate, setSelectedDate} = useDateContext();
  const { t, i18n } = useTranslation();
  const currentLanguage = useAppSelector(state => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <div>
        <div className="">
            <div className="absolute z-10 text-gray-500 p-4 dark:text-white">
                <CalendarDays/>
            </div>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="MM/yyyy"
                className="w-full pl-14 pr-4 py-4 text-gray-500 rounded-xl bg-gray-100 outline-none dark:bg-dark-second dark:text-white"
                placeholderText={t('selectYearMonth')}
                popperPlacement="bottom-start"
                showMonthYearPicker
            />
        </div>
    </div>
  )
};

export default YearMonthPicker;
