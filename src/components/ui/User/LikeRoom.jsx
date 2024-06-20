import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";
import {
  AirIcon,
  IronIcon,
  KichenIcon,
  ParkIcon,
  PoolIcon,
  RefrigeratorIcon,
  TiviIcon,
  WashIcon,
  WifiIcon,
} from "../../../utils/IconSVG";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";

export const LikeRoom = () => {
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!likeCart || likeCart.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <img
          src="../../../../images/like.png"
          className="w-[30%] h-auto"
          alt=""
        />
        <p className="mb-[20px] text-rose-500 text-[40px]">
          Chưa có lựa chọn yêu thích nào !
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Danh sách phòng yêu thích
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
        {likeCart.map((item, i) => {
          let {
            id,
            hinhAnh,
            tenPhong,
            khach,
            phongNgu,
            phongTam,
            giuong,
            giaTien,
          } = item;

          return (
            <section key={i} className="shadow-lg rounded  duration-300">
              <div className="p-3">
                <h2 className="text-lg font-bold text-rose-400">{tenPhong}</h2>
                <img
                  style={{ width: "100%", height: "auto" }}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`${PATH.details}/${id}`);
                  }}
                  src={hinhAnh}
                  alt="mainImage"
                />
                <div className="pt-4 pb-2">
                  <span className="span-gray">{khach} khách</span>
                  <span className="span-gray">{phongNgu} phòng ngủ</span>
                  <span className="span-gray">{giuong} giường</span>
                  <span className="span-gray">{phongTam} phòng tắm</span>
                  <span className="span-gray bg-yellow-300">
                    {giaTien}$/đêm
                  </span>
                  <Link
                    to={`${PATH.details}/${id}`}
                    className="span-gray text-gray-50 bg-red-500"
                  >
                    Chi tiết
                  </Link>
                </div>
                <div className="flex justify-between">
                  <div className="flex">{renderComforts(item, "mx-1")}</div>
                  <button
                    className="w-[100px] rounded-[8px] bg-rose-500 p-[10px] text-white hover:bg-rose-600 transition-all ease-in-out"
                    onClick={() => {
                      dispatch(quanLyPhongActions.addLikeCart(item));
                    }}
                  >
                    Bỏ thích
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export let itemsHome = [
  {
    key: "tivi",
    icon: <TiviIcon />,
    name: "Tivi 32in",
  },
  {
    key: "dieuHoa",
    icon: <AirIcon />,
    name: "Điều hòa",
  },
  {
    key: "mayGiat",
    icon: <RefrigeratorIcon />,
    name: "Máy giặt miễn phí",
  },
  {
    key: "doXe",
    icon: <ParkIcon />,
    name: "Bãi đỗ xe",
  },
  {
    key: "banLa",
    icon: <IronIcon />,
    name: "Bàn là",
  },
  {
    key: "wifi",
    icon: <WifiIcon />,
    name: "Wifi",
  },
  {
    key: "bep",
    icon: <KichenIcon />,
    name: "Bếp",
  },
  {
    key: "banUi",
    icon: <WashIcon />,
    name: "Bàn ủi",
  },
  {
    key: "hoBoi",
    icon: <PoolIcon />,
    name: "Hồ bơi",
  },
];

export const renderComforts = (data, element, note) => {
  let keyArray = [];
  for (const key in data) {
    if (data[key] === true) {
      keyArray.push(key);
    }
  }
  let homeComforts = itemsHome.filter((item) => keyArray.includes(item.key));
  return homeComforts.map((item, i) => (
    <p key={i} className={element}>
      {item.icon}
      {note === "isRoom" && <span>{item.name}</span>}
    </p>
  ));
};
