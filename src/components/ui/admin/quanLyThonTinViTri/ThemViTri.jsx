import React from "react";
import { usePostViTri } from "../../../../hooks/api/quanLyViTriApi/usePostViTri";
import { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { toast } from "react-toastify";

export const ThemViTri = () => {
  const mutation = usePostViTri();
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          toast.success("Thêm Vị Trí Thành Công");
          formik.resetForm();
          // triggerRefetch();
          navigate(PATH.quanlythongtinvitri);
        },
        onError: () => {
          toast.error("Thêm Vị Trí Thất Bại!");
        },
      });
    },
  });

  return (
    <div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Vị Trí">
          <Input name="tenViTri" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Tỉnh Thành">
          <Input name="tinhThanh" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Quốc Gia">
          <Input name="quocGia" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <Input name="hinhAnh" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Hành Động">
          <Button htmlType="submit" loading={mutation.isPending}>
            Thêm Vị Trí
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
