import React, { useEffect } from "react";
import { Table } from "antd";
import { useGetViTri } from "../../../../hooks/api/quanLyViTriApi/useGetViTri";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { useDeleteViTri } from "../../../../hooks/api/quanLyViTriApi/useDeleteViTri";

export const QuanLyThongTinViTri = () => {
  const { data: lstViTri, refetch } = useGetViTri();
  const mutationDeleteVT = useDeleteViTri();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá vị trí này không?")) {
      mutationDeleteVT.mutate(id, {
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
        return <img key={viTri?.id} src={viTri.hinhAnh} alt="hinhAnhViTri" />;
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
            <EditOutlined
              className="mr-[15px]"
              onClick={() => {
                navigate(`${PATH.editvitri}/${viTri?.id}`);
              }}
              style={{ color: "blue" }}
            />
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
    <div>
      <NavLink to={PATH.themvitri}>
        <button className="border-[1px] border-black py-[8px] px-[12px] rounded-[5px] mb-[20px]">
          Thêm Vị Trí
        </button>
      </NavLink>
      <Table columns={columns} dataSource={lstViTri} />
    </div>
  );
};
