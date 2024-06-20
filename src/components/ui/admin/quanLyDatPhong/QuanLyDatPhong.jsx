import React from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { useGetDatPhong } from "../../../../hooks/api/quanLyDatPhongApi/useGetDatPhong";
import { useDeletePhongDaDat } from "../../../../hooks/api/quanLyDatPhongApi/useDeletePhongDaDat";
import { NavLink } from "react-router-dom";

export const QuanLyDatPhong = () => {
  const { data: lstDatPhong, refetch } = useGetDatPhong();
  const mutationDeleteND = useDeletePhongDaDat();
  const navigate = useNavigate()

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?")) {
      mutationDeleteND.mutate(id, {
        onSuccess: () => {
          toast.success("Xoá Thành Công!");
          refetch();
        },
        onError: (error) => {
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
      title: "Mã Phòng",
      dataIndex: "maPhong",
      filterMode: "tree",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Mã Người Dùng",
      dataIndex: "maNguoiDung",
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngayDen",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngayDi",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Số Lượng Khách",
      dataIndex: "soLuongKhach",
      filterSearch: true,
      width: "10%",
    },
    {
      title: "Hành Động",
      dataIndex: "",
      key: "x",
      render: (_, phong) => {
        return (
          <div key={phong.id}>
           <EditOutlined
              className="mr-[15px]"
              onClick={() => {
               navigate(`${PATH.editdatphong}/${phong.id}`)
              }}
              style={{ color: "blue" }}
            />
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
    <NavLink to={PATH.themdatphong}>
        <button className="border-[1px] border-black py-[8px] px-[12px] rounded-[5px] mb-[20px]">
          Thêm Đặt Phòng
        </button>
      </NavLink>

      <Table columns={columns} dataSource={lstDatPhong} />
    </div>
  );
};
