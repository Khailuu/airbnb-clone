import React from "react";
import { useParams } from "react-router-dom";
import { useGetBinhLuanTheoMaPhong } from "../../../hooks/useGetBinhLuanTheoMaPhong";
import { usePostBinhLuan } from "../../../hooks/usePostBinhLuan";
import { getUserLogin } from "../../../utils/getUserLogin";
import { useFormik } from "formik";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

export const RoomComment = () => {
  const { id: maPhong } = useParams();
  const { data: binhLuan } = useGetBinhLuanTheoMaPhong(maPhong);
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const mutation = usePostBinhLuan()
  const strDate = currDate + currTime
  console.log("str", strDate)
  const { user, token } = getUserLogin()

  const formik = useFormik({
    initialValues: {
      id: 0,
      maPhong: maPhong,
      maNguoiBinhLuan: user.id,
      ngayBinhLuan: strDate,
      noiDung: '',
      saoBinhLuan: 0
    },
    onSubmit: (values) => {
      mutation.mutate(values)
      console.log("values",values)
    }
  })

  const renderIcon = () => {
    if(user.role === "ADMIN") {
      return (
        <div className="flex my-[20px]">
        <FormOutlined className="mr-[15px]" style={{color: "blue"}} />
        <DeleteOutlined style={{color: "red"}}/>

        </div>
      )
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2">
      {binhLuan?.map((v) => {
        return (
          <div key={v.id} className="mb-[50px]">
            <div className="flex mb-[30px]">
              <img
                className="rounded-full w-[60px] h-[60px]"
                src={v.avatar}
                alt="logo"
                onError={({ currentTarget }) => {
                  currentTarget.src = "https://picsum.photos/60/60";
                }}
              />
              <p>{v.ngayBinhLuan}</p>
            </div>
                {renderIcon()}
            <h3 className="w-[500px]">{v.noiDung}</h3>
          </div>
        );
      })}
      

    </div>
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]" >Hãy để lại bình luận của bạn để chúng tôi có thể hoàn thiện tốt hơn cho lần phục vụ tiếp theo: </h2>
      <form onSubmit={formik.handleSubmit}>
        <textarea onChange={formik.handleChange} className="w-full border-[1px] border-black pl-[10px] pt-2" placeholder="Bình luận"  name="noiDung" id="" cols="30" rows="10">

        </textarea>
        <input onChange={formik.handleChange} className="border-[1px] border-black p-[12px] my-[10px] w-[40px]" name="saoBinhLuan"  />
        <span> : Số sao</span>
        <button type="submit" className="bg-rose-500 p-[12px] rounded-[6px] text-white" style={{display: "block"}}>Thêm Bình Luận</button>
      </form>
    </div>
  );
};
