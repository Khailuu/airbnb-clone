import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="AuthLayout h-full">
      <div className="h-screen w-screen relative ">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="w-full h-full object-cover object-center"
            src="/images/bg.jpg"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-50 "></div>

        <div className="absolute w-[450px] iphone-6:w-[350px]  p-[30px] top-1/2 left-1/2 bg-[rgba(255,255,255)] z-20 -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Outlet className=" sm:w-[90%] w-[70%] mx-auto md:w-[90%] iphone-6:!w-[70%]" />
        </div>
      </div>
    </div>
  );
};
