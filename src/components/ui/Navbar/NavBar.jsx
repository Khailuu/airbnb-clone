import React from "react";
import { BiSearch } from "react-icons/bi";
import { Form, Input, Select, Button } from "antd";
import "./style.css";
import { useGetViTri } from "../../../hooks/useGetViTri";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

export const NavBar = () => {
  const { data: listViTri } = useGetViTri();
  const navigate = useNavigate();
  console.log(listViTri);

  const formik = useFormik({
    initialValues: {
      viTri: null,
      date: '',
      guests: ''
    },
    onSubmit: values => {
      console.log('Selected ViTri ID:', values.viTri);
      navigate(`${PATH.roomlist}/${values.viTri}`);
    },
  });

  
  return (
    <Form
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onFinish={formik.handleSubmit}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold justify-between">
          <div className="text-sm font-semibold !px-6 text-center">
            AnyWhere{" "}
            <Form.Item className="w-[200px]">
              <Select
                name="viTri"
                onChange={value => formik.setFieldValue('viTri', value)}
                value={formik.values.viTri}
              >
                {listViTri?.map((viTri) => (
                  <Select.Option
                    key={viTri.id}
                    value={viTri.id}
                  >
                    {viTri.tenViTri} , {viTri.tinhThanh}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          AnyWeek
          <Input
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-center">
            Add Guests
            <Input
              name="guests"
              value={formik.values.guests}
              onChange={formik.handleChange}
            />
          </div>
          <Button type="primary" htmlType="submit" className="p-2 bg-rose-500 h-[50px] w-[50px] rounded-full text-white text-center">
            <BiSearch className="size-7" />
          </Button>
        </div>
      </div>
    </Form>
  );
};
