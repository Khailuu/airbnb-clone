import React, { useEffect } from "react";
import { Table } from "antd";
import { useGetPhong } from "../../../hooks/useGetPhong";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteNguoiDung } from "../../../hooks/useDeleteNguoiDung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

export const QuanLyThongTinPhong = () => {
  const { data: lstPhong, refetch } = useGetPhong();
  const mutationDeleteND = useGetPhong();
  const navigate = useNavigate()


  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?")) {
      mutationDeleteND.mutate(id, {
        onSuccess: () => {
          toast.success("Xoá Thành Công!");
          refetch();
        },
        onError: (error) => {
          console.log(error);
          toast.error("Xoá Thất Bại!");
        },
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "10%",
    },
    {
      title: "Tên Phòng",
      dataIndex: "tenPhong",
      filterMode: "tree",
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Mã Vị Trí",
      dataIndex: "maViTri",
      filterSearch: true,
      width: "10%",
    },
    {
      title: "Giá Tiền",
      dataIndex: "giaTien",
      filterSearch: true,
      width: "10%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      filterSearch: true,
      render: (_, phong) => {
        return <img src={phong.hinhAnh} alt="hinhAnhPhong" />
      },
      width: "10%",
    },
    {
      title: "Hành Động",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (_, phong) => {
        return (
          <div key={phong.id}>
            <EditOutlined className="mr-[15px]" onClick={() => {
                navigate(`${PATH}/${phong.id}`)
              }} style={{ color: "blue" }} />
                <DeleteOutlined
                  onClick={() => handleDelete(phong.id)}
                  className="mr-[15px]"
                  style={{ color: "red" }}
                />
          </div>
        );
      },
    },
  ];


  return (
    <Table columns={columns} dataSource={lstPhong}  />
  );
};
