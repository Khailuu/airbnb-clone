import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <div className="AuthLayout h-full">
            <div className="grid grid-cols-2 gap-7">
                <div>
                    <img src="public/images/pngwing.com.png" alt="..." />
                </div>
                <Outlet />
            </div>
        </div>
    )
}