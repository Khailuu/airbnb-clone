import React from "react";
import { UserMenu } from "./Navbar/UserMenu";
import { NavBar } from "./Navbar/NavBar";
import { NavLink } from "react-router-dom";
import { PATH } from "../../constant";
import { IconAirbnb } from "../IconAirbnb";
export const Header = () => {
  return (
    <div style={{ top: 0 }} className="sticky bg-white z-10 shadow-sm">
      <div className="py-1 border-b-[1px]">
        <div className=" mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <NavLink to={PATH.home}>
              <IconAirbnb />
            </NavLink>
            <div className="iphone-6:hidden iphone-6-plus:hidden">
              <NavBar />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
