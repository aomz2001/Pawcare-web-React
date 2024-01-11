import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home/Home";
import LandingPage from "../layouts/user/LandingPage";
import Condition from "../Pages/User/Page/Condition";
import MyAccount from "../Pages/User/Page/MyAccount";
import Signin from "../Pages/User/Login/Signin";
import Signup from "../Pages/User/Login/Signup";
import HomePageProvider from "../layouts/provider/HomePageProvider";
import HomeProvider from "../Pages/Provider/HomeProvider/HomeProvider";
import SigninProvider from "../Pages/Provider/LoginProvider/SigninProvider";
import { SignupProvider } from "../Pages/Provider/LoginProvider/SignupProvider";
import { AdminPage } from "../layouts/admin/AdminPage";
import { HomeAdmin } from "../Pages/admin/HomeAdmin/HomeAdmin";
import { SysInfo } from "../Pages/admin/SystemInformation/SysInfo";
import { Search } from "../Pages/User/Search/Search";
import { ProviderProfile } from "../Pages/User/Search/ProviderProfile";
import { Notifications } from "../Pages/User/Page/Notifications";
import { Payment } from "../Pages/User/Page/Payment";
import { Review } from "../Pages/User/Page/ReviewProvider/Review";
import { ProviderAccount } from "../Pages/Provider/ProviderAccount/ProviderAccount";
import { WorkforPet } from "../Pages/Provider/Work/WorkforPet";
import { Contact } from "../Pages/Provider/ContactAdmin/Contact";
import { AdminWork } from "../Pages/admin/AdminWork/AdminWork";
import { ContactPawcare } from "../Pages/User/Page/ContactPawcare";

const router = createBrowserRouter([
  //===============================================path user
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/condition',
        element: <Condition />,
      },
      {
        path: '/my-account',
        element: <MyAccount />,
      },
      {
        path: '/search-service',
        element: <Search />,
      },
      {
        path: '/provider-profile',
        element: <ProviderProfile />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/review-provider',
        element: <Review />,
      },
      {
        path: '/contact-pawcare',
        element: <ContactPawcare />,
      },
    ],
  },
  {
    path: '/login',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  //===============================================path provider
  {
    path: '/provider',
    element: <HomePageProvider />,
    children: [
      {
        index: true,
        element: <HomeProvider />
      },
      {
        path: '/provider/account-provider',
        element: <ProviderAccount />
      },
      {
        path: '/provider/your-work',
        element: <WorkforPet />
      },
      {
        path: '/provider/request-to-admin',
        element: <Contact />
      },
    ],
  },
  {
    path: '/provider/signup-provider',
    element: <SignupProvider />,
  },
  {
    path: '/provider/login-provider',
    element: <SigninProvider />
  },
  //===============================================path admin
  {
    path: '/for-admin-only',
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <HomeAdmin />
      },
      {
        path: 'system-information',
        element: <SysInfo />,
      },
      {
        path: 'work-admin',
        element: <AdminWork />,
      },
    ]
  },
])
export default router;