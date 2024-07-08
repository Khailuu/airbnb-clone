import React from "react";
import { useTranslation } from "react-i18next";

export const HomeAnyWhere = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto mb-[40px]">
      <h2 className="text-rose-500 text-[32px] font-bold mb-[30px]">
        {t("batCuDau")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid:cols-4 gap-[30px]">
        <div>
          <img
            className="rounded-[12px]"
            style={{ objectFit: "center", height: 240, width: 480 }}
            alt="example"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=2560&im_q=highq"
          />
          <h3 className="mt-[12px] font-bold">{t("toanBoNha")}</h3>
        </div>
        <div>
          <img
            className="rounded-[12px]"
            style={{ objectFit: "center", height: 240, width: 480 }}
            alt="example"
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=2560&im_q=highq"
          />
          <h3 className="mt-[12px] font-bold">{t("choODocDao")}</h3>
        </div>
        <div>
          <img
            className="rounded-[12px]"
            style={{ objectFit: "center", height: 240, width: 480 }}
            alt="example"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8HAbpDefQC8eNT4guUEpdoMAU46IWEEuMOg&s"
          />
          <h3 className="mt-[12px] font-bold">{t("trangTraiVaThienNhien")}</h3>
        </div>

        <div>
          <img
            className="rounded-[12px]"
            style={{ objectFit: "center", height: 240, width: 480 }}
            alt="example"
            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock603577589huge-1676023759244.jpg"
          />
          <h3 className="mt-[12px] font-bold">{t("choMangThuCung")}</h3>
        </div>
      </div>
    </div>
  );
};
