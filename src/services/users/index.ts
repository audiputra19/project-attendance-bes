import { ApiRes, ForgotPassReq, ForgotPassRes, LoginReq, LoginRes, RegisterReq, ResetPassReq, ResetPassRes, verificationReq, verificationRes } from "../../interfaces/auth";
import { apiAuth } from "../api";

export const userApi = apiAuth.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<ApiRes<LoginRes>, LoginReq>({
            query(body) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                };
            },
        }),
        register: build.mutation<ApiRes<void>, RegisterReq>({
            query(body) {
              return {
                url: '/auth/register',
                method: 'POST',
                body,
              };
            },
        }),
        forgotPass: build.mutation<ForgotPassRes, ForgotPassReq>({
            query: body => ({
                url: '/auth/forgot-pass',
                method: 'POST',
                body
            })
        }),
        resetPass: build.mutation<ResetPassRes, ResetPassReq>({
            query: body => ({
                url: '/auth/reset-pass',
                method: 'POST',
                body
            })
        }),
        verification: build.mutation<verificationRes, verificationReq>({
            query: body => ({
                url: '/auth/verification',
                method: 'POST',
                body
            })
        })
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useForgotPassMutation, useResetPassMutation, useVerificationMutation } = userApi;