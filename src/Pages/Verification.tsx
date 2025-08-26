import { FC, useEffect, useState } from "react";
import { useVerificationMutation } from "../services/users";
import { useAlert } from "../Context/AlertContext";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import { CircleAlert } from "lucide-react";

interface TokenPayload {
    exp: number
}

const Verfication: FC = () => {
    const [verify, {isSuccess, isLoading, data, error}] = useVerificationMutation();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [form, setForm] = useState({token: ''});
    const {token} = useParams();
    const [expired, setExpired] = useState<boolean>(false)
    
    useEffect(() => {
        if(token) {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                setExpired(true);
            } else {
                setForm({token});
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
                    <p className="text-2xl font-semibold text-black dark:text-white">Verification
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div className="relative">
                    <div className="mt-5">
                        <button 
                            type="submit"
                            className={`w-full px-5 py-4 text-white rounded-xl font-bold ${expired ? `bg-color-base opacity-60` : `bg-color-base hover:bg-color-baseHover`}`}
                            onClick={() => verify(form)}
                            disabled={expired}
                        >
                            Verify Now
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default Verfication;