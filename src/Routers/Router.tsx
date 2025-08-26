import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { MainLayout } from "../Layouts/MainLayout";
import About from "../Pages/About";
import Attendance from "../Pages/Attendance";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import LanguangeSelector from "../Pages/LanguangeSelector";
import Login from "../Pages/Login";
import Menu from "../Pages/Menu";
import PdfViewer from "../Pages/PdfViewer";
import Profile from "../Pages/Profile";
import Register from "../Pages/Regiter";
import ReportAttendance from "../Pages/ReportAttendance";
import ResetPassword from "../Pages/ResetPassword";
import Salary from "../Pages/Salary";
import { ProtectedRoute } from "./ProtectedRoute";
import Leave from "../Pages/Leave";
import Verfication from "../Pages/Verification";
import Thr from "../Pages/Thr";

export const Router:FC = () => {
    let element = [
        {
            path: '/',
            element: <ProtectedRoute><MainLayout/></ProtectedRoute>,
            // element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: '/report',
                    element: <ReportAttendance/>
                },
                {
                    path: '/profile',
                    element: <Profile/>
                },
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout/>,
            children: [
                {
                    index: true,
                    element: <Login/>
                },
                {
                    path: '/auth/register',
                    element: <Register/>
                },
                {
                    path: '/auth/forgot-pass',
                    element: <ForgotPassword/>
                },
                {
                    path: '/auth/reset-pass/:token',
                    element: <ResetPassword/>
                },
                {
                    path: '/auth/verification/:token',
                    element: <Verfication/>
                }
            ]
        },
        {
            path: '/attendance',
            element: <ProtectedRoute><Attendance/></ProtectedRoute>
        },
        {
            path: '/pdf-viewer',
            element: <ProtectedRoute><PdfViewer/></ProtectedRoute>
        },
        {
            path: '/salary',
            element: <ProtectedRoute><Salary/></ProtectedRoute>
        },
        {
            path: '/menu',
            element: <ProtectedRoute><Menu/></ProtectedRoute>
        },
        {
            path: '/lang',
            element: <ProtectedRoute><LanguangeSelector/></ProtectedRoute>
        },
        {
            path: '/profileMenu',
            element: <ProtectedRoute><Profile/></ProtectedRoute>
        },
        {
            path: '/ReportMenu',
            element: <ProtectedRoute><ReportAttendance/></ProtectedRoute>
        },
        {
            path: '/about',
            element: <ProtectedRoute><About/></ProtectedRoute>
        },
        {
            path: '/leave',
            element: <ProtectedRoute><Leave/></ProtectedRoute>
        },
        {
            path: '/thr',
            element: <ProtectedRoute><Thr/></ProtectedRoute>
        }
    ];

    let routes = useRoutes(element);

    return routes
}