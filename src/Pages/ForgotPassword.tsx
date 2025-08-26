import { AtSign, Mail } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import { useAlert } from "../Context/AlertContext";
import { useForgotPassMutation } from "../services/users";

const ForgotPassword: FC = () => {
    const [form, setForm] = useState({email: ''});
    const { showAlert } = useAlert();
    const [forgotPass, { data, isSuccess, isLoading, error }] = useForgotPassMutation();

    useEffect(() => {
        if (isSuccess && data) {
            showAlert(data.message);
        } else if (error) {
            const message = (error as any)?.data?.message;
            showAlert(message);
        }
    }, [data, isSuccess, error, showAlert]);

    return (
        isLoading 
        ? ( <Loading/> )
        : (
            <div className="px-5 pb-5 pt-10 w-full sm:mx-12 md:w-3/4 lg:w-1/2">
                <Alert/>
                <div>
                    <p className="text-2xl font-semibold text-black dark:text-white">Forgot Password
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div className="relative">
                    <div className="mt-5">
                        <div className="absolute text-gray-500 left-0 p-4 dark:text-white">
                            <AtSign/>
                        </div>
                        <input
                            type="text"
                            className="w-full pl-14 pr-4 py-4 text-gray-500 outline-none rounded-xl bg-gray-100 dark:bg-dark-second dark:text-white"
                            placeholder="Email"
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            value={form.email}
                        />
                    </div>
                    <div className="mt-5">
                        <button 
                            type="submit"
                            className="w-full px-5 py-4 bg-color-base text-white rounded-xl font-bold hover:bg-color-baseHover"
                            onClick={() => forgotPass(form)}
                        >
                            Send to Email
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <p className="text-gray-500 text-sm dark:text-gray-400">Cek email kamu</p>
                        <Link 
                            to="https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&hl=in&osid=1&service=mail&ss=1&ltmpl=default&rm=false&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                            className="ml-2 font-bold text-color-base cursor-pointer"
                        >
                            <Mail/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    )
}

export default ForgotPassword;