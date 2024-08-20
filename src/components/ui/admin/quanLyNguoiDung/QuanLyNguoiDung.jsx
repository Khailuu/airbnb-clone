import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useGetNguoiDung } from "../../../../hooks/api/quanLyNguoiDungApi/useGetNguoiDung";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteNguoiDung } from "../../../../hooks/api/quanLyNguoiDungApi/useDeleteNguoiDung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { NavLink } from "react-router-dom";
import { Input } from 'antd';
const { Search } = Input;

export const QuanLyNguoiDung = () => {
  const { data: lstNguoiDung, refetch } = useGetNguoiDung();
  const mutationDeleteND = useDeleteNguoiDung();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

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
      title: "Họ Tên",
      dataIndex: "name",
      filterMode: "tree",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "birthday",
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "role",
      filterSearch: true,
      width: "10%",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      filterSearch: true,
      render: (_, nguoiDung) => {
        return nguoiDung.gender ? "Nam" : "Nữ";
      },
      width: "10%",
    },
    {
      title: "Hành Động",
      dataIndex: "",
      key: "x",
      render: (_, nguoiDung) => {
        return (
          <div key={nguoiDung.id}>
            {nguoiDung.role === "ADMIN" ? (
              <EditOutlined
                className="mr-[15px]"
                onClick={() => {
                  navigate(`${PATH.editNguoiDung}/${nguoiDung.id}`);
                }}
                style={{ color: "blue" }}
              />
            ) : (
              <>
                <EditOutlined
                  className="mr-[15px]"
                  onClick={() => {
                    navigate(`${PATH.editNguoiDung}/${nguoiDung.id}`);
                  }}
                  style={{ color: "blue" }}
                />
                <DeleteOutlined
                  onClick={() => handleDelete(nguoiDung.id)}
                  className="mr-[15px]"
                  style={{ color: "red" }}
                />
              </>
            )}
          </div>
        );
      },
    },
  ];

  const [filteredName, setFilterdName] = useState([]);

  const onKeyUp = (e) => {
    const input = e?.target.value.toLowerCase();
    console.log(input);
    const filtered = lstNguoiDung?.filter((user) =>
      user.name.toLowerCase().includes(input)
    );
    setFilterdName(filtered || []);
  };

  console.log(filteredName)
  const data = filteredName.length > 0 ? filteredName : lstNguoiDung;

  return (
    <div>
      <NavLink to={PATH.themnguoidung}>
        <button className="border-[1px] !w-[160px] border-black py-[8px] px-[12px] rounded-[5px] mb-[20px]">
          Thêm Người Dùng
        </button>
      </NavLink>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onKeyUp={onKeyUp}
        className="mb-[20px]"
      />
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};
