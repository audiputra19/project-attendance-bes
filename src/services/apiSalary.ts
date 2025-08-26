import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SalaryReq, SalaryRes } from "../interfaces/salary";

export const apiSalary = createApi({
    reducerPath: 'apiSalary',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://app.sknmedical.co.id/skn/audi/dataku-react-bes', 
    }),
    endpoints: build => ({
        postSalary: build.mutation<SalaryRes, SalaryReq>({
            query: body => ({
                url: '/api_salary.php',
                method: 'POST',
                body
            })
        })
    })
})

export const { usePostSalaryMutation } = apiSalary;