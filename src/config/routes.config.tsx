import {createBrowserRouter} from "react-router"
import { lazy, Suspense } from "react";
// import HomePage from "../pages/home/home.page";

const HomePage = lazy(() =>(import ("../pages/home/home.page"))) //lazy loading needes export default
import { RegisterPage } from "../pages/auth/register/register.page";
import { TermsAndConditions } from "../pages/auth/terms and conditions/termsandconditions.page";
import { ForgetPassword } from "../pages/auth/forget-password/forget-password";
import { NotFoundError } from "../components/errors/not-found.component";
import AdminLayout from "../pages/layout/admin-layout";
import { ComingSoon } from "../components/comingsoon/coming-soon";
import { ActivatePage } from "../pages/auth/activation/activate.page";
import { ResetPasswordPage } from "../pages/auth/forget-password/reset-password-token";
import { Spin } from "antd";


 export const router = createBrowserRouter([
    {
        path:"/",
        Component:HomePage,
        // element: <HomePage />,

        //for loading APIs
        /* loader : () =>{
            return "Hello"
        } */
    },
    {
        path:'activate/:activationToken',
        Component:ActivatePage
    },
    {
        path: "/terms-and-conditions",
        Component:TermsAndConditions
    },
    {
        path:'verify-forget-token/:forgetToken',
        element:<Suspense fallback={<Spin fullscreen></Spin>}><ResetPasswordPage/></Suspense> //for loading until this page renders also for performance optimization
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/forget-password",
        element: <ForgetPassword />
    },
    {
        path:"/admin",
        Component: AdminLayout,
        children:[{
            index:true,
            Component:ComingSoon
        },
        {
            path:"banner",
            Component:ComingSoon
        },
        {
            path:"brand",
            Component:ComingSoon
        },
        {
            path:"category",
            Component:ComingSoon
        },
        {
            path:"users",
            Component:ComingSoon
        },
        {
            path:"*",
            // Component:NotFoundError
            element:<NotFoundError url="/admin"/>
        }
        ]
    },

    //for error page or random url which is not registered
    {
        path:"*",
        Component:NotFoundError
    }
]);