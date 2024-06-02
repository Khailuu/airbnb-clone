import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../constant";


export const Footer = () => {
  return (
    <div>
      <footer className="px-4 divide-y bg-gray-100 text-gray-800">
        <div className="container flex flex-col pb-10 justify-between lg:py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <NavLink
              to={PATH.home}
              rel="noopener noreferrer"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <img className="h-48" src="../../../public/images/pngwing.com.png"  alt="travel_logo" />
            </NavLink>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className=" tracking-wide uppercase text-rose-500 text-[25px]">
                Giới thiệu
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                  >
                    Phương thức hoạt động
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                  >
                    Lý tưởng
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                  >
                    Nhà đầu tư
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                  >
                    Cơ hội nghề nghiệp
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className=" tracking-wide uppercase text-rose-500 text-[25px]">Dịch vụ</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    Tổ chức tour
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    Trở thành đối tác
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    Cộng đồng
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className=" uppercase text-rose-500 text-[25px]">Hỗ trợ</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    Tùy chọn hủy
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/"
                    className="hover:text-red-500 duration-300"
                  >
                    Biện pháp mùa dịch
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-rose-500 text-[25px]">Social media</div>
              <div className="flex justify-start space-x-3">
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Facebook"
                  className="flex items-center p-1 hover:text-red-500 duration-300"
                >
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Twitter"
                  className="flex items-center p-1 hover:text-red-500 duration-300"
                >
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Instagram"
                  className="flex items-center p-1 hover:text-red-500 duration-300"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center text-gray-600">
          © 2024 Luu Khai. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
