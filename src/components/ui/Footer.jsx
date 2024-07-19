import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../constant";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-rose-400">
      <footer className="px-4 divide-y bg-gray-50 text-black">
        <div className="modal"></div>
        <div className="container grid-cols-4 pb-10 justify-between  lg:pb-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 !z-10 content">
          <div className="col-span-1 flex justify-center mb-[20px]">
            <NavLink
              to={PATH.home}
              rel="noopener noreferrer"
              className="inline"
            >
              <img
                className="h-40"
                src="../../../images/pngwing.com.png"
                alt="travel_logo"
              />
            </NavLink>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 col-span-2 sm:grid-cols-4 text-center">
            <div className="space-y-3">
              <h3 className=" tracking-wide uppercase text-rose-500 text-[25px] font-bold mb-[30px]">
                {t("GIỚI THIỆU")}
              </h3>
              <ul className="space-y-1">
                <li className="!mb-[10px]">
                  <a
                    href="https://www.facebook.com/"
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                  >
                    {t("Phương thức hoạt động")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    href="https://www.facebook.com/"
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                  >
                    {t("Lý tưởng")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    href="https://www.facebook.com/"
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                  >
                    {t("Nhà đầu tư")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    href="https://www.facebook.com/"
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                  >
                    {t("Cơ hội nghề nghiệp")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className=" tracking-wide uppercase text-rose-500 text-[25px] font-bold mb-[30px]">
                {t("DỊCH VỤ")}
              </h3>
              <ul className="space-y-1">
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    {t("Tổ chức tour")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    {t("Trở thành đối tác")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    {t("Cộng đồng")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className=" uppercase text-rose-500 text-[25px] font-bold mb-[30px]">
                {t("HỖ TRỢ")}
              </h3>
              <ul className="space-y-1">
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    {t("Trung tâm trợ giúp")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                    href="https://www.facebook.com/"
                  >
                    {t("Tùy chọn hủy")}
                  </a>
                </li>
                <li className="!mb-[10px]">
                  <a
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/"
                    className="text-black text-[16px] hover:text-rose-500 duration-300"
                  >
                    {t(" Biện pháp mùa dịch")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-rose-500 text-[25px] font-bold mb-[30px]">
                Social media
              </div>
              <div className="flex justify-start flex-col space-x-3">
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Facebook"
                  className="p-1 hover:text-rose-500 text-black text-[16px] duration-300"
                >
                  Facebook
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Twitter"
                  className="p-1 !ml-0 hover:text-rose-500 text-black text-[16px] duration-300"
                >
                  Twitter
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Instagram"
                  className="p-1 !ml-0 hover:text-rose-500 text-black text-[16px] duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 copyright text-sm text-center text-black text-[16px]">
          © 2024 All rights reserved. Design by{" "}
          <a href="https://www.facebook.com/khailuu1512/" target="blank">
            <span className="text-rose-500 text-[16px] font-semibold">
              Khải Lưu
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};
