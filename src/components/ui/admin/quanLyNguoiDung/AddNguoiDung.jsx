import React, { useEffect, useState } from "react";
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

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({size}) => {
    setComponentSize(size)
  }

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
      mutation.mutate(values, {
        onSuccess: () => {
          toast.success("Thêm người dùng mới thành công");
          navigate(PATH.quanlynguoidung);
        },
        onError: (error) => {
          toast.error("Thêm người dùng thất bại");
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
    initialValues={{ size: componentSize }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
    style={{ maxWidth: 600 }}
    onSubmitCapture={formik.handleSubmit}
  >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
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
