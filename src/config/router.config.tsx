// import {BrowserRouter, Routes, Route} from "react-router";
// import {createBrowserRouter, RouterProvider} from "react-router"
// import HomePage from "../pages/home/home.page";
// import { RegisterPage } from "../pages/auth/register/register.page";
// import { TermsAndConditions } from "../pages/auth/terms and conditions/termsandconditions.page";
// import { ForgetPassword } from "../pages/auth/forget-password/forget-password";

import { RouterProvider } from "react-router";
import {router} from "./routes.config"


const RouterConfig = () =>{

    // const router = createBrowserRouter([
    //     {
    //         path:"/",
    //         Component:HomePage,
    //         // element: <HomePage />,

    //         //for loading APIs
    //         /* loader : () =>{
    //             return "Hello"
    //         } */
    //     },
    //     {
    //         path: "/terms-and-conditions",
    //         Component:TermsAndConditions
    //     },
    //     {
    //         path: "/register",
    //         element: <RegisterPage />
    //     },
    //     {
    //         path: "/forget-password",
    //         element: <ForgetPassword />
    //     }
    // ]);


    return (
        <>
        {/* <BrowserRouter>
        <Routes>
                <Route path="/" 
                //element={<HomePage/>} or
                Component={HomePage}
                ></Route>
                <Route path="/terms-and-conditions" 
                // element={<>Comming Soon!</>}
                Component={TermsAndConditions}
                ></Route>
                <Route path="/register" Component={RegisterPage}></Route>
                <Route path="/forget-password" Component={ForgetPassword}></Route>
        </Routes>
        </BrowserRouter> */}

        <RouterProvider router={router}></RouterProvider>

        </>
    )
} 

export default RouterConfig;