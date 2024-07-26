import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBinhLuanTheoMaPhong } from "../../../hooks/api/quanLyBinhLuanApi/useGetBinhLuanTheoMaPhong";
import { usePostBinhLuan } from "../../../hooks/api/quanLyBinhLuanApi/usePostBinhLuan";
import { useFormik } from "formik";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDeleteBinhLuan } from "../../../hooks/api/quanLyBinhLuanApi/useDeleteBinhLuan";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { StarRating } from "./StarRating"; // Đảm bảo bạn nhập đúng đường dẫn đến file StarRating
import { FaStar } from "react-icons/fa";

export const RoomComment = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const { t } = useTranslation();
  const { id: maPhong } = useParams();
  const { data: binhLuan, refetch } = useGetBinhLuanTheoMaPhong(maPhong);
  const [visibleCount, setVisibleCount] = useState(4);
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const mutation = usePostBinhLuan();
  const mutaionDelete = useDeleteBinhLuan();
  const strDate = `${currDate} ${currTime}`;

  const formik = useFormik({
    initialValues: {
      id: 0,
      maPhong: maPhong,
      maNguoiBinhLuan: userLogin?.user.id,
      ngayBinhLuan: strDate,
      noiDung: "",
      saoBinhLuan: 0,
    },
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          formik.resetForm();
          toast.success("Thêm bình luận thành công");
          refetch();
        },
      });
    },
  });

  const handleSeeMore = () => {
    setVisibleCount(binhLuan.length);
    setSeeMoreClicked(true);
  };

  const handleHide = () => {
    setVisibleCount(10);
    setSeeMoreClicked(false);
  };

  useEffect(() => {
    refetch();
  }, [maPhong, refetch]);

  const renderIcon = (id) => {
    if (userLogin?.user.role === "ADMIN") {
      return (
        <div className="flex my-[20px]">
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => {
              mutaionDelete.mutate(id, {
                onSuccess: () => {
                  refetch();
                  toast.success("Xoá bình luận thanh công!");
                },
                onError: (err) => {
                  toast.error(err?.message);
                },
              });
            }}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <h2 className="mt-[30px] text-rose-500 text-[25px] font-bold mb-[30px]">
        {t("Reviews")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {binhLuan?.slice(0, visibleCount).map((v) => (
          <div key={v.id} className="border-[1px] rounded-[8px] p-[20px]">
            <div className="flex items-center  mb-[30px] justify-between">
              <div className="flex">
                <img
                  className="rounded-full w-[60px] h-[60px] iphone-6:w-[40px] iphone-6:h-[40px] iphone-6-plus:w-[40px] iphone-6-plus:h-[40px]"
                  src={v.avatar}
                  alt="logo"
                  onError={({ currentTarget }) => {
                    currentTarget.src = "https://picsum.photos/60/60";
                  }}
                />
                <div className="ml-[15px]">
                  <p className="mb-[8px] iphone-6:text-[14px] iphone-6-plus:text-[14px]">
                    {v.tenNguoiBinhLuan}
                  </p>
                  <p className="text-gray-500 iphone-6:text-[10px] iphone-6-plus:text-[10px]">
                    {v.ngayBinhLuan}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span>{v.saoBinhLuan} / 5</span>
                <FaStar
                  className="cursor-pointer"
                  style={{ color: "#ffc107" }}
                  size={20}
                />
              </div>
            </div>
            {renderIcon(v?.id)}
            <div className="flex justify-between">
              <h3 className="">{v.noiDung}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-[50px]">
        {binhLuan?.length > 8 && !seeMoreClicked && (
          <button
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-all ease-in-out"
            onClick={handleSeeMore}
          >
            {t("xemThem")}
          </button>
        )}
        {seeMoreClicked && (
          <button
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-all ease-in-out"
            onClick={handleHide}
          >
            {t("anBot")}
          </button>
        )}
      </div>
      <h2 className="mt-[30px] text-rose-500 text-[25px] font-bold mb-[30px]">
        {t(
          "Hãy để lại bình luận của bạn để chúng tôi có thể hoàn thiện tốt hơn cho lần phục vụ tiếp theo:"
        )}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          onChange={formik.handleChange}
          className="mb-[20px] w-full border-[1px] border-black pl-[10px] pt-2 rounded-[10px]"
          placeholder="Bình luận"
          name="noiDung"
          id=""
          cols="30"
          rows="7"
          value={formik.values.noiDung}
        ></textarea>
        <div className="flex mb-[20px] items-center">
          <span className="mr-[10px]">{t("Số sao")}: </span>
          <StarRating
            value={formik.values.saoBinhLuan}
            onChange={(value) => formik.setFieldValue("saoBinhLuan", value)}
          />
        </div>
        <Button
          htmlType="submit"
          className="bg-rose-500 rounded-[6px] p-0 !w-[160px] text-white"
          style={{ display: "block" }}
          loading={mutation.isPending}
        >
          {t("Thêm Bình Luận")}
        </Button>
      </form>
    </div>
  );
};
