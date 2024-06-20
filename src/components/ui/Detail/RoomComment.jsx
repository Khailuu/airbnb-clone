import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBinhLuanTheoMaPhong } from "../../../hooks/api/quanLyBinhLuanApi/useGetBinhLuanTheoMaPhong";
import { usePostBinhLuan } from "../../../hooks/api/quanLyBinhLuanApi/usePostBinhLuan";
import { useFormik } from "formik";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDeleteBinhLuan } from "../../../hooks/api/quanLyBinhLuanApi/useDeleteBinhLuan";
import { toast } from "react-toastify";
import { Button } from "antd";

export const RoomComment = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);

  const { id: maPhong } = useParams();
  const { data: binhLuan, refetch } = useGetBinhLuanTheoMaPhong(maPhong);
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const mutation = usePostBinhLuan();
  const mutaionDelete = useDeleteBinhLuan()
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
          refetch();
        },
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [maPhong, refetch]);



  const renderIcon = (id) => {
    if (userLogin?.user.role === "ADMIN") {
      return (
        <div className="flex my-[20px]">
          <DeleteOutlined style={{ color: "red" }} onClick={() => {
            mutaionDelete.mutate(id, {
              onSuccess: () => {
                refetch()
                toast.success("Xoá bình luận thanh công!")
              },
              onError: (err) => {
                toast.error(err?.message)
              }
            })
          }}/>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-[30px]">
        {binhLuan?.map((v) => (
          <div
            key={v.id}
            className="border-[1px] rounded-[8px] p-[20px]"
          >
            <div className="flex mb-[30px]">
              <img
                className="rounded-full w-[60px] h-[60px]"
                src={v.avatar}
                alt="logo"
                onError={({ currentTarget }) => {
                  currentTarget.src = "https://picsum.photos/60/60";
                }}
              />
              <div className="ml-[15px]">
                <p className="mb-[8px]">{v.tenNguoiBinhLuan}</p>
                <p className="text-gray-500">{v.ngayBinhLuan}</p>
              </div>
            </div>
            {renderIcon(v?.id)}
            <div className="flex justify-between">
              <h3 className="w-[500px]">{v.noiDung}</h3>
              <div className="flex items-center">
                <span>{v.saoBinhLuan}/10</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3M664.8 561.6l36.1 210.3L512 672.7L323.1 772l36.1-210.3l-152.8-149L417.6 382L512 190.7L606.4 382l211.2 30.7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-[30px] text-rose-500 text-[25px] font-bold mb-[30px]">
        Hãy để lại bình luận của bạn để chúng tôi có thể hoàn thiện tốt hơn cho
        lần phục vụ tiếp theo:
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          onChange={formik.handleChange}
          className="w-full border-[1px] border-black pl-[10px] pt-2 rounded-[10px]"
          placeholder="Bình luận"
          name="noiDung"
          id=""
          cols="30"
          rows="10"
          value={formik.values.noiDung}
        ></textarea>
        <input
          type="number"
          min={1}
          max={10}
          onChange={formik.handleChange}
          className="border-[1px] border-black p-[12px] my-[10px] w-[50px] rounded-[5px]"
          name="saoBinhLuan"
          value={formik.values.saoBinhLuan}
        />
        <span> : Số sao</span>
        <Button
          htmlType="submit"
          className="bg-rose-500 rounded-[6px] text-white"
          style={{ display: "block" }}
          loading={mutation.isPending}
        >
          Thêm Bình Luận
        </Button>
      </form>
    </div>
  );
};
