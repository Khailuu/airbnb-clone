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
            src="https://media.cnn.com/api/v1/images/stellar/prod/191011110307-02-australia-beautiful-places.jpg?q=w_2187,h_1230,x_0,y_0,c_fill/h_447"
          />
          <h3 className="mt-[12px] font-bold">{t("toanBoNha")}</h3>
        </div>
        <div>
          <img
            className="rounded-[12px]"
            style={{ objectFit: "center", height: 240, width: 480 }}
            alt="example"
            src="https://vcdn1-dulich.vnecdn.net/2019/03/05/Phap-1-1551759006.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=WMZ8Cos1Tq-6Ad3YFrcJAg"
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
