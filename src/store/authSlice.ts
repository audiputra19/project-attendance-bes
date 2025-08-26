import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRes, User } from "../interfaces/auth";

interface AuthState {
    userInfo?: User;
    token?: string;
}

const initialState: AuthState = {
    userInfo: undefined,
    token: undefined
};

const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }: PayloadAction<LoginRes>) => {
            state.userInfo = payload.userData;
            state.token = payload.token;
        },
        clearToken: (state) => {
            state.userInfo = undefined;
            state.token = undefined;
        }
    }
})

export const { setToken, clearToken} = authSLice.actions;
export default authSLice.reducer;

