import { FileText, House, LayoutGrid, User, UserCheck } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const MainLayout:FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <div className="pb-20 md:p-0 bg-white min-h-screen dark:bg-dark-main">
                <Outlet/>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 md:hidden lg:hidden dark:bg-dark-second dark:border-none">
                <div className="relative grid grid-cols-5 px-5 items-center gap-2">
                    <NavLink
                        to="/"
                        className='flex justify-center p-3 z-10 dark:text-white'>
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                <House className={isActive ? 'text-color-base' : 'text-gray-500 dark:text-gray-300'} />
                                <p className={`text-xs mt-1 ${isActive ? 'text-color-base' : 'text-gray-400 dark:text-gray-300'}`}>{t('home')}</p>
                            </div>
                        )}
                    </NavLink>
                    <NavLink
                        to="/report"
                        className='flex justify-center p-3 z-10 dark:text-white'>
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                <FileText className={isActive ? 'text-color-base' : 'text-gray-500 dark:text-gray-300'} />
                                <p className={`text-xs mt-1 ${isActive ? 'text-color-base' : 'text-gray-400 dark:text-gray-300'}`}>{t('report')}</p>
                            </div>
                        )}
                    </NavLink>
                    <div className="p-3"></div>
                    <div 
                        className="absolute flex justify-center w-full"
                        onClick={() => navigate('/attendance')}
                    >
                        <div className="p-4 mb-16 border-8 border-white rounded-full bg-color-base text-white dark:border-dark-second">
                            <UserCheck size={32}/>
                        </div>
                    </div>
                    <NavLink
                        to="/profile"
                        className='flex justify-center p-3 z-10 dark:text-white'>
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                <User className={isActive ? 'text-color-base' : 'text-gray-500 dark:text-gray-300'} />
                                <p className={`text-xs mt-1 ${isActive ? 'text-color-base' : 'text-gray-400 dark:text-gray-300'}`}>{t('profile')}</p>
                            </div>
                        )}
                    </NavLink>    
                    <NavLink
                        to="/menu"
                        className='flex justify-center p-3 z-10 dark:text-white'>
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                <LayoutGrid className={isActive ? 'text-color-base' : 'text-gray-500 dark:text-gray-300'} />
                                <p className={`text-xs mt-1 ${isActive ? 'text-color-base' : 'text-gray-400 dark:text-gray-300'}`}>{t('menu')}</p>
                            </div>
                        )}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}