import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { PATH } from "../constant";
import { Home, Login, Register } from "../pages";
import { HomeLayout } from "../components/layouts/HomeLayout";
import { Room } from "../pages/Room";
import { RoomList } from "../components/ui/Content/RoomList";
import { RoomDetail } from "../components/ui/Detail/RoomDetail";
import { Details } from "../pages/Details";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminTemplate } from "../components/template/AdminTemplate";
import { Payment } from "../pages/Payment";

const router = [
    {
        element: <AuthLayout/>,
        children: [
            {
                path: PATH.login,
                element: <Login />
            },
            {
                path: PATH.register,
                element: <Register />
            }
        ]
    },
    {
        element: <HomeLayout/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: PATH.roomlist,
                element: <Room />,
                children: [
                    {
                        path: `${PATH.roomlist}/:id`,
                        element: <RoomList />
                    }
                ]
            },
            {
                path: PATH.details,
                element: <Details />,
                children: [
                    {
                        path: `${PATH.details}/:id`,
                        element: <RoomDetail />
                    }
                ]
            },
            {
                path: PATH.payment,
                element: <Payment />
            }
        ]
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: PATH.admin,
                element: <AdminTemplate />

            }
        ]

    }
]
export const Router = () => useRoutes(router)