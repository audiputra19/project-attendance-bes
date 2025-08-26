import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfileReq, ProfileRes } from "../interfaces/profile";

export const apiProfile = createApi({
    reducerPath: 'apiProfile',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-attendance-bes.vercel.app' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: build => ({
        postProfile: build.mutation<ProfileRes, ProfileReq>({
            query: body => ({
                url: '/profile',
                method: 'POST',
                body
            })
        })
    })
})

export const { usePostProfileMutation } = apiProfile;