
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
// import HomePage from "../pages/home/home.page";

const HomePage = lazy(() => import("../pages/home/home.page")); //lazy loading needes export default
import { RegisterPage } from "../pages/auth/register/register.page";
import { ForgetPassword } from "../pages/auth/forget-password/forget-password";
import { NotFoundError } from "../components/errors/not-found.component";
import AdminLayout from "../pages/layout/admin-layout";
import { ComingSoon } from "../components/comingsoon/coming-soon";
import { ActivatePage } from "../pages/auth/activation/activate.page";
import { ResetPasswordPage } from "../pages/auth/forget-password/reset-password-token";
import { Spin } from "antd";
// import BannerList from "../pages/banner/banner-list";
// import BannerCreate from "../pages/banner/banner-create";
// import BannerEdit from "../pages/banner/banner-edit";
// import BrandList from "../pages/brand/brand-list";
// import BrandCreate from "../pages/brand/brand-create";
// import BrandEdit from "../pages/brand/brand-edit";
// import CategoryList from "../pages/category/category-list";
// import CategoryCreate from "../pages/category/category-create";
// import CategoryEdit from "../pages/category/category-edit";

export const router = createBrowserRouter([
  {
    path: "/",
    // Component:HomePage,
    element: (
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <HomePage />
      </Suspense>
    ),

    //for loading APIs
    /* loader : () =>{
            return "Hello"
        } */
  },
  {
    path: "activate/:activationToken",
    Component: ActivatePage,
  },
//   {
//     path: "/terms-and-conditions",
//     Component: TermsAndConditions,
//   },
  {
    path: "verify-forget-token/:forgetToken",
    element: (
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <ResetPasswordPage />
      </Suspense>
    ), //for loading until this page renders also for performance optimization
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: ComingSoon,
      },
    {
    //     path: "banner",
    //     element: (
    //       <Suspense fallback={<Spin fullscreen />}>
    //         <BannerList />
    //       </Suspense>
    //     ),
    //   },
    //   {
    //     path: "banner/create",
    //     Component: BannerCreate,
    //   },
    //   {
    //     path: "banner/:id",
    //     Component: BannerEdit,
    /  },
    //   {
    //     path: "brand",
    //     element: (
    //       <Suspense fallback={<Spin fullscreen />}>
    //         <BrandList />
    //       </Suspense>
    //     ),
    //   },
    //   {
    //     path: "brand/create",
    //     Component: BrandCreate,
    //   },
    //   {
    //     path: "brand/:id",
    //     Component: BrandEdit,
    //   },
    //   {
    //     path: "category",
    //     Component: CategoryList,
    //   },
    //   {
    //     path: "category/create",
    //     Component: CategoryCreate,
    //   },
    //   {
    //     path: "brand/:id",
    //     Component: CategoryEdit,
    //   },
      {
        path: "users",
        Component: ComingSoon,
      },
      {
        path: "*",
        // Component:NotFoundError
        element: <NotFoundError url="/admin" />,
      },
    ],
  },

  //for error page or random url which is not registered
  {
    path: "*",
    Component: NotFoundError,
  },
]);
