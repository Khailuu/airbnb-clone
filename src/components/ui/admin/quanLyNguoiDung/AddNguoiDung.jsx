// src/components/AddNguoiDung.jsx

import React, { useEffect } from "react";
import { Button, Form, Input, Radio, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import moment from 'moment';
import { PATH } from "../../../../constant";
import { useAddNguoiDung } from "../../../../hooks/api/quanLyNguoiDungApi/useAddNguoiDung";
import { toast } from "react-toastify";

export const AddNguoiDung = () => {
  const mutation = useAddNguoiDung();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      birthday: '',
      gender: true,
      role: ''
    },
    onSubmit: values => {
      console.log('Form submitted with values:', values);
      mutation.mutate(values, {
        onSuccess: () => {
          toast.success("Thêm người dùng mới thành công");
          console.log('Navigate to user management');
          navigate(PATH.quanlynguoidung);
        },
        onError: (error) => {
          toast.error("Thêm người dùng thất bại");
          console.error("Failed to add user:", error);
        }
      });
    }
  });

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error.message);
      console.error("Failed to add user:", mutation.error);
    }
  }, [mutation.isError, mutation.error]);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      size="default"
      style={{ maxWidth: 600 }}
      onFinish={formik.handleSubmit}
    >
      For 
      <Form.Item label="Name">
        <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Birthday">
        <DatePicker 
          name="birthday" 
          value={formik.values.birthday ? moment(formik.values.birthday, 'DD-MM-YYYY') : null} 
          format='DD-MM-YYYY'
          onChange={(date, dateString) => formik.setFieldValue('birthday', dateString)} 
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Radio.Group name="gender" value={formik.values.gender} onChange={formik.handleChange}>
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Role">
        <Input name="role" value={formik.values.role} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add User</Button>
      </Form.Item>
    </Form>
  );
};
