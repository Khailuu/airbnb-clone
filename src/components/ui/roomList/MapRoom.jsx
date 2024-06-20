import React from "react";
import GoogleMapReact from "google-map-react";
import { Popover } from "antd";
import { randomNumber } from "../../../utils/randomNumber";
import { Link } from "react-router-dom";

export const MapRoom = ({ roomList, currentPosition }) => {
  const MyMark = ({ item }) => {
    const content = (
      <div className="flex flex-col w-80 md:w-96">
        <Link
          className="hover:cursor-pointer text-base font-semibold text-blue-400 hover:text-blue-700 duration-300 "
        >
          {item.tenPhong}
        </Link>
        <img className="mx-auto" src={item.hinhAnh} alt="img_new" />
      </div>
    );
    

    return (
      <Popover content={content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="!w-8 !h-[20px] text-rose-500"
          style={{ width: 32, height: 32, color: "rgb(244 63 94)" }}
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold text-base text-white">
          {item.giaTien + ""}$
        </span>
      </Popover>
    );
  };
  let { lat, lng } = currentPosition.center;
  return <div style={{ height: "100%", width: "100%" }}>
  {lat?<GoogleMapReact center={[lat, lng]} defaultZoom={12}>
    {roomList?.map((item, i) => {
      return (
        <MyMark
          key={i}
          lat={lat + randomNumber(10) * 0.009}
          lng={lng + randomNumber(10) * 0.009}
          item={item}
          center={[lat,lng]}
        />
      );
    })}
  </GoogleMapReact>:""}
</div>;
};
