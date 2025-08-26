import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListReportReq, ListReportRes, MainReportReq, MainReportRes } from "../interfaces/report";

export const apiReport = createApi({
    reducerPath: 'apiReport',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://project-attendance-bes.vercel.app' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: build => ({
        mainReport: build.mutation<MainReportRes, MainReportReq>({
            query: body => ({
                url: '/report/main',
                method: 'POST',
                body
            })
        }),
        listReport: build.mutation<ListReportRes[], ListReportReq>({
            query: body => ({
                url: '/report/list',
                method: 'POST',
                body
            })
        })
    })
})

export const { useMainReportMutation, useListReportMutation } = apiReport;