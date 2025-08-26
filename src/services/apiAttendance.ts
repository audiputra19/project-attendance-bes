import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AttendanceReq, AttendanceRes, TimeAttendanceReq, TimeAttendanceRes } from "../interfaces/attendance";

export const apiAttendance = createApi({
    reducerPath: 'apiAttendance',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://project-attendance-bes.vercel.app' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: build => ({
        postAttendance: build.mutation<AttendanceRes, AttendanceReq>({
            query: body => ({
                url: '/attendance',
                method: 'POST',
                body,
            }) 
        }),
        timeAttendance: build.mutation<TimeAttendanceRes, TimeAttendanceReq>({
            query: body => ({
                url: '/time-attendance',
                method: 'POST',
                body
            })
        })
    })
})

export const { usePostAttendanceMutation, useTimeAttendanceMutation } = apiAttendance;