import React from "react";
import { BiSearch } from "react-icons/bi";
import { Form, Select, Button } from "antd";
import "./style.css";
import { useGetViTri } from "../../../hooks/api/quanLyViTriApi/useGetViTri";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

export const NavBar = () => {
  const { data: listViTri } = useGetViTri();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      viTri: null,
      date: "",
      guests: "",
    },
    onSubmit: (values) => {
      navigate(`${PATH.roomlist}/${values.viTri}`);
    },
  });

  return (
    <Form
      className="border-[1px] w-zz mb-[0px] md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onFinish={formik.handleSubmit}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold justify-between">
          <div className="text-sm flex flex-row items-center font-semibold !px-6 text-center">
            <Form.Item className="mr-[8px] w-[200px] mb-[0px]">
              <Select
                name="viTri"
                onChange={(value) => formik.setFieldValue("viTri", value)}
                value={formik.values.viTri}
                placeholder="Nhập địa điểm bạn muốn đến"
              >
                {listViTri?.map((viTri) => (
                  <Select.Option key={viTri.id} value={viTri.id}>
                    {viTri.tenViTri} , {viTri.tinhThanh}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="p-2 bg-rose-500 h-[20px] w-[20px] rounded-full text-white text-center"
            >
              <BiSearch
                style={{ lineHeight: 20, transform: "translate(-36%, -30%)" }}
                className="size-3"
              />
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
