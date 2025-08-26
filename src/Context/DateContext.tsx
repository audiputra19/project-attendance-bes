import { createContext, FC, ReactNode, useContext, useState } from "react";

interface DateContextProps {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);
export const DateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <DateContext.Provider value={{ selectedDate, startDate, endDate, setSelectedDate, setStartDate, setEndDate }}>
            {children}
        </DateContext.Provider>
    )
}

export const useDateContext = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDateContext must be used within a DateProvider');
    }

    return context;
}