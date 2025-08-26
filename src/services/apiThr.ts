import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ThrReq, ThrRes } from "../interfaces/thr";

export const apiThr = createApi({
    reducerPath: 'apiThr',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://app.sknmedical.co.id/skn/audi/dataku-react-bes' 
    }),
    endpoints: build => ({
        postThr: build.mutation<ThrRes, ThrReq>({
            query: body => ({
                url: '/api_thr.php',
                method: 'POST',
                body
            })
        })
    }),
})

export const { usePostThrMutation } = apiThr;