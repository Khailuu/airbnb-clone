import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { PATH } from "../constant";
import { Home, Login, Register } from "../pages";
import { HomeLayout } from "../components/layouts/HomeLayout";
import { Room } from "../pages/Room";
import { RoomList } from "../components/ui/Content/RoomList";

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
            }
        ]
    }
]
export const Router = () => useRoutes(router)