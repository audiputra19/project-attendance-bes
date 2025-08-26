import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api-attendance-bes.vercel.app',
    // baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if(token){
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export const apiAuth = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
})