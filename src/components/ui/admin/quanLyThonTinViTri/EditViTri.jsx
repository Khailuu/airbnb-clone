import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
} from "antd";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../../constant";
import { toast } from "react-toastify";
import { quanLyViTriService } from "../../../../services/QuanLyViTriService";
import { useEditViTri } from "../../../../hooks/api/quanLyViTriApi/useEditViTri";

export const EditViTri = () => {
  const mutation = useEditViTri()
  const { id } = useParams()
  const parseId = parseInt(id)
  const [ viTri, setViTri] = useState(null)

  useEffect(() => {
    quanLyViTriService.getViTriTheoId(parseId)
      .then((res) => {
        setViTri(res.data?.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parseId])
  const navigate = useNavigate()
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        id: viTri?.id,
        tenViTri: viTri?.tenViTri,
        tinhThanh: viTri?.tinhThanh,
        quocGia: viTri?.quocGia,
        hinhAnh: viTri?.hinhAnh,
    },
    onSubmit: (values) => {
        mutation.mutate({id: viTri?.id, payload: values}, {
            onSuccess: () => {
                toast.success("Update Vị Trí Thành Công")
                formik.resetForm()
                navigate(PATH.quanlythongtinvitri)
            },
            onError: () => {
                toast.error("Update Vị Trí Thất Bại!")
            }
        })
    }
  })

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
          <Input name="tenViTri" value={formik.values.tenViTri} onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Tỉnh Thành">
          <Input name="tinhThanh" value={formik.values.tinhThanh} onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Quốc Gia">
          <Input name="quocGia" value={formik.values.quocGia} onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <Input name="hinhAnh" value={formik.values.hinhAnh} onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Hành Động">
          <Button htmlType="submit">Cập Nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
