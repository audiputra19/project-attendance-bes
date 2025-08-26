import { jwtDecode } from "jwt-decode";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { clearToken } from "../store/authSlice";

interface TokenPayload {
    exp: number;
}

export const ProtectedRoute: FC<{children: JSX.Element}> = ({ children }) => {
    const token: string | undefined = useAppSelector(state => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(token){
            const decodedToken = jwtDecode<TokenPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                dispatch(clearToken());
                navigate('/auth');
            }
        } else {
            navigate('/auth');
        }
        
    },[token, navigate, dispatch]);
    
    return children;
}