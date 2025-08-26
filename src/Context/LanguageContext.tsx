import { FC, useEffect } from 'react';
import { useAppSelector } from '../store';
import { useTranslation } from 'react-i18next';

const LanguageProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();
    const currentLanguage = useAppSelector(state => state.language.language);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [i18n, currentLanguage]);

    return <>{children}</>;
};

export default LanguageProvider;
