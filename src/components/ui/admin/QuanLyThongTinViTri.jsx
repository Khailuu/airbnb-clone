import React, { useEffect } from "react";
import { Table } from "antd";
import { useGetViTri } from "../../../hooks/useGetViTri";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteNguoiDung } from "../../../hooks/useDeleteNguoiDung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

export const QuanLyThongTinViTri = () => {
  const { data: lstViTri, refetch } = useGetViTri();
  const mutationDeleteND = useDeleteNguoiDung();
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
      title: "Tên Vị Trí",
      dataIndex: "tenViTri",
      filterMode: "tree",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "tinhThanh",
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      filterSearch: true,
      render: (_, viTri) => {
        return <img key={viTri?.id} src={viTri.hinhAnh} alt="hinhAnhViTri" />
      },
      width: "10%",
    },
    {
      title: "Hành Động",
      dataIndex: "",
      key: "x",
      render: (_, viTri) => {
        return (
          <div key={viTri?.id}>
            <EditOutlined className="mr-[15px]" onClick={() => {
                navigate(`${PATH}/${viTri?.id}`)
              }} style={{ color: "blue" }} />
                <DeleteOutlined
                  onClick={() => handleDelete(viTri?.id)}
                  className="mr-[15px]"
                  style={{ color: "red" }}
                />
          </div>
        );
      },
    },
  ];


  return (
    <Table columns={columns} dataSource={lstViTri}  />
  );
};
