import React from "react";
import { Table } from "antd";
import { useGetPhong } from "../../../../hooks/api/quanLyPhongApi/useGetPhong";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { useDeletePhong } from "../../../../hooks/api/quanLyPhongApi/useDeletePhong";

export const QuanLyThongTinPhong = () => {
  const { data: lstPhong, refetch } = useGetPhong();
  const mutation = useDeletePhong();
  const navigate = useNavigate()


  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá phòng này không?")) {
      mutation.mutate(id, {
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
    <div>
      <NavLink to={PATH.themphong}>
        <button className="border-[1px] border-black py-[8px] px-[12px] rounded-[5px] mb-[20px]">Thêm Phòng</button>
      </NavLink>
    <Table columns={columns} dataSource={lstPhong}  />
    </div>
  );
};
