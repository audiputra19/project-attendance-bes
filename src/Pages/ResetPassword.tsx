import { jwtDecode } from "jwt-decode";
import { CircleAlert, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import { useAlert } from "../Context/AlertContext";
import { useResetPassMutation } from "../services/users";

interface TokenPayload {
    exp: number
}

const ResetPassword: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [form, setForm] = useState({token: '', newPassword: '', confirmPassword: ''});
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [resetPass, { data, isSuccess, isLoading, error }] = useResetPassMutation();
    const { token } = useParams<string>();
    const [expired, setExpired] = useState<boolean>(false)
    
    useEffect(() => {
        if(token) {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                setExpired(true);
            } else {
                setForm(prev => ({ ...prev, token }));
            }
        }
    }, [token])
    
    useEffect(() => {
        if (isSuccess && data) {
            showAlert(data.message);
            navigate('/');
        } else if (error) {
            const message = (error as any)?.data?.message;
            showAlert(message);
        }
    }, [data, isSuccess, error, navigate, showAlert]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        isLoading 
        ? ( <Loading/> )
        : (
            <div className="px-5 pb-5 pt-10 w-full sm:mx-12 md:w-3/4 lg:w-1/2">
                {expired ? (
                    <div className="p-2 mb-5 text-red-500 bg-red-100 border border-2 border-red-200 rounded-xl flex items-center">
                        <div className="p-2 bg-red-500 rounded-xl text-white">
                            <CircleAlert/>
                        </div>
                        <p className="pl-3">token expired</p>
                    </div>
                ) : null}
                <Alert/>
                <div>
                    <p className="text-2xl font-semibold text-black dark:text-white">Reset Password
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div className="relative">
                    <div className="mt-3 flex">
                        <div className="absolute text-gray-500 left-0 p-4 dark:text-white">
                            <LockKeyhole/>
                        </div>
                        <input
                            type={showPassword ? `text` : `password`}
                            className="w-full pl-14 pr-14 py-4 text-gray-500 rounded-xl outline-none bg-gray-100 dark:bg-dark-second dark:text-white"
                            placeholder="New Password"
                            value={form.newPassword}
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    newPassword: e.target.value,
                                }))
                            }
                            disabled={expired}
                        />
                        <div className="absolute right-0 p-4 text-gray-500 dark:text-white cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff/> : <Eye/>}
                        </div>
                    </div>
                    <div className="mt-3 flex">
                        <div className="absolute text-gray-500 left-0 p-4 dark:text-white">
                            <LockKeyhole/>
                        </div>
                        <input
                            type={showConfirmPassword ? `text` : `password`}
                            className="w-full pl-14 pr-14 py-4 text-gray-500 rounded-xl outline-none bg-gray-100 dark:bg-dark-second dark:text-white"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={e => 
                                setForm(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))
                            }
                            disabled={expired}
                        />
                        <div className="absolute text-gray-500 right-0 p-4 dark:text-white cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <EyeOff/> : <Eye/>}
                        </div>
                    </div>
                    <div className="mt-5">
                        <button 
                            type="submit"
                            className={`w-full px-5 py-4 text-white rounded-xl font-bold ${expired ? `bg-color-base opacity-60` : `bg-color-base hover:bg-color-baseHover`}`}
                            onClick={() => resetPass(form)}
                            disabled={expired}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ResetPassword;