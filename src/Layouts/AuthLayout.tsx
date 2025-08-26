import { ArrowLeft, Moon, Sun } from "lucide-react";
import { FC } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

export const AuthLayout: FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const {token} = useParams();

    return (
        <div className="min-h-screen bg-white dark:bg-dark-main">
            <div className="sticky z-10 bg-white top-0 px-5 py-5 md:px-20 lg:px-48 dark:bg-dark-main">
                <div className={location.pathname === '/auth' ? `flex justify-end items-center` : `flex justify-start items-center`}>
                    {location.pathname === '/auth' ? (
                        <div 
                            onClick={toggleTheme}
                            className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                        >
                            {isDarkMode 
                            ? ( <Sun/> ) 
                            : ( <Moon/> )}
                        </div>
                    ) : (
                        location.pathname === `/auth/reset-pass/${token}` ? null : (
                            <button 
                                onClick={() => navigate(-1)}
                                className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                            >
                                <ArrowLeft/>
                            </button>
                        )
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <Outlet/>
            </div>
        </div>
    )
}