import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import { useAlert } from "../Context/AlertContext";
import { useLoginMutation } from "../services/users";
import { useAppDispatch } from "../store";
import { setToken } from "../store/authSlice";
import Loading from "../Components/Loading";

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();
    const [form, setForm] = useState({nik: '', password: ''});
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setToken(data.data));
            showAlert(data.message);
            navigate('/');
        } else if (error) {
            const message = (error as any)?.data?.message;
            showAlert(message);
        }
    }, [data, isSuccess, error, dispatch, navigate, showAlert]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            login(form);
        }
    }

    return (
        isLoading 
        ? ( <Loading/> ) 
        : (
            <div className="px-5 pb-5 pt-10 w-full sm:mx-12 md:w-3/4 lg:w-1/2">
                <Alert/>
                <div>
                    <p className="text-2xl font-semibold text-black dark:text-white">Login
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div className="relative" onKeyDown={handleKeyDown}>
                    <div className="mt-5">
                        <div className="absolute text-gray-500 left-0 p-4 dark:text-white">
                            <User/>
                        </div>
                        <input
                            type="text"
                            className="w-full pl-14 pr-4 py-4 text-gray-500 rounded-xl bg-gray-100 outline-none dark:bg-dark-second dark:text-white"
                            placeholder="NIK"
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    nik: e.target.value,
                                }))
                            }
                            value={form.nik}
                        />
                    </div>
                    <div className="mt-3 flex">
                        <div className="absolute text-gray-500 left-0 p-4 dark:text-white">
                            <LockKeyhole/>
                        </div>
                        <input
                            type={showPassword ? `text` : `password`}
                            className="w-full pl-14 pr-14 py-4 text-gray-500 rounded-xl bg-gray-100 outline-none dark:bg-dark-second dark:text-white"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                        <div className="absolute right-0 p-4 text-gray-500 dark:text-white cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff/> : <Eye/>}
                        </div>
                    </div>
                    <div className="flex justify-end mt-3">
                        <div
                            className="font-semibold cursor-pointer text-gray-600 text-sm dark:text-white"
                            onClick={() => navigate('/auth/forgot-pass')}
                        >
                            Forgot password?
                        </div>
                    </div>
                    <div className="mt-5">
                        <button 
                            type="submit"
                            className="w-full px-5 py-4 bg-color-base text-white rounded-xl font-bold hover:bg-color-baseHover"
                            onClick={() => login(form)}
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <p className="text-gray-500 text-sm dark:text-gray-400">Don't have an account?</p>
                        <p 
                            className="ml-2 font-semibold text-color-base cursor-pointer"
                            onClick={() => navigate('/auth/register')}
                        >
                            Register
                        </p>
                    </div>
                </div>
            </div>
        ) 
    )
}

export default Login