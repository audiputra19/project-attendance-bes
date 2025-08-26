import { Banknote, Bus, ChevronRight, Coins, Eclipse, FileText, Globe, House, Info, LogOut, UserCheck } from "lucide-react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostProfileMutation } from "../services/apiProfile";
import { useAppDispatch, useAppSelector } from "../store";
import ToggleSwitch from "../Components/ToggleSwitch";
import { useTheme } from "../Context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useModal } from "../Context/ModalContext";
import { clearToken } from "../store/authSlice";

const Menu: FC = () => {
    const navigate = useNavigate();
    const [profile, {data: profileData, isLoading}] = usePostProfileMutation();
    const nameParts = profileData?.data?.nama?.split(" ");
    const username = nameParts?.slice(0, 2).join(' ');
    const userData = useAppSelector(state => state.auth.userInfo)
    const {isDarkMode, toggleTheme} = useTheme();
    const { t } = useTranslation();
    const { openModal } = useModal();
    const dispatch = useAppDispatch();

    useEffect(() => {
        profile({nik: userData?.nik})
    }, [profile, userData?.nik]);

    const handleLogout = () => {
        openModal('Are you sure you want to logout?', 'Logout', () => {
            dispatch(clearToken());
        })
    }

    return (
        <div className="w-full min-h-screen py-5 px-5 sm:px-12 md:px-32 lg:px-80 flex flex-col gap-5 bg-white dark:bg-dark-main">
            <div 
                className="p-5 flex justify-between items-center gap-5 bg-gray-100 rounded-2xl cursor-pointer dark:bg-dark-second" 
                onClick={() => navigate('/profileMenu')}
            >
                {isLoading ? (
                    <div className="flex flex-col gap-2">
                        <div className="w-[180px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                        <div className="w-[200px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg text-black font-semibold dark:text-white">{username}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{profileData?.data.email}</p>
                    </div>
                )}
                <div className="text-gray-400">
                    <ChevronRight size={28}/>
                </div>
            </div>

            {/* ----------------------------- contents -----------------------------*/}    

            <div className="p-3 bg-gray-100 rounded-2xl flex flex-col gap-3 dark:bg-dark-second dark:text-white">
                <div className="p-2">
                    <p className="text-gray-500 font-semibold dark:text-gray-400">Contents</p>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <House/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('homePage')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/attendance')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <UserCheck/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('attendance')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/salary')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Banknote/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('salary')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/leave')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Bus/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('leave')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/reportMenu')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <FileText/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('report')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600" 
                    onClick={() => navigate('/thr')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Coins/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('thr')}</p>
                        <div className="text-gray-400">
                            <ChevronRight size={28}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------- more Settings -----------------------------*/}    

            <div className="p-3 bg-gray-100 rounded-2xl flex flex-col gap-3 dark:bg-dark-second dark:text-white">
                <div className="p-2">
                    <p className="text-gray-500 font-semibold dark:text-gray-400">More Settings</p>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => navigate('/lang')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Globe/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('language')}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-400">{t('title')}</p>
                            <div className="text-gray-400">
                                <ChevronRight size={28}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl">
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Eclipse/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('darkMode')}</p>
                        <ToggleSwitch isChecked={isDarkMode} onTonggle={toggleTheme} />
                    </div>
                </div>
            </div>

            {/* ----------------------------- more info -----------------------------*/}

            <div className="p-3 bg-gray-100 rounded-2xl flex flex-col gap-3 dark:bg-dark-second dark:text-white">
                <div className="p-2">
                    <p className="text-gray-500 font-semibold dark:text-gray-400">More Info</p>
                </div>
                <div 
                    className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center cursor-pointer p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => navigate('/about')}
                >
                    <div className="flex justify-center text-gray-700 dark:text-white">
                        <Info/>
                    </div>
                    <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12 flex justify-between items-center">
                        <p className="text-gray-700 dark:text-white">{t('about')}</p>
                        <div className="flex items-center gap-2">
                            <div className="text-gray-400">
                                <ChevronRight size={28}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="px-4 py-3 bg-red-500 text-white rounded-2xl flex items-center gap-2 font-semibold hover:bg-red-600"
                    onClick={handleLogout}
                >
                    <LogOut/> {t('logout')}    
                </button>  
            </div>    
        </div>
    )
}

export default Menu;