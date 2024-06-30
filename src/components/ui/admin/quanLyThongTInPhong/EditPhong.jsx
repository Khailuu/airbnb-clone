import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Input, Checkbox, Col, Row, message } from "antd";
import { useEditPhong } from "../../../../hooks/api/quanLyPhongApi/useEditPhong";
import { quanLyPhongService } from "../../../../services/QuanLyPhongService";
import { toast } from "react-toastify";
import { PATH } from "../../../../constant";

export const EditPhong = () => {
  const { id } = useParams();
  const parseId = parseInt(id);
  const [phong, setPhong] = useState(null);
  const mutation = useEditPhong();
  const navigate = useNavigate();

  useEffect(() => {
    quanLyPhongService
      .getPhongThueTheoId(parseId)
      .then((res) => {
        setPhong(res.data?.content);
      })
      .catch((err) => {
        console.error("Failed to fetch room data:", err);
        message.error("Failed to fetch room data. Please try again.");
      });
  }, [id]);

  const [dataBox] = useState([
    "mayGiat",
    "tivi",
    "doXe",
    "hoBoi",
    "dieuHoa",
    "banLa",
    "banUi",
    "bep",
    "wifi",
  ]);

  console.log(phong?.tienNghi);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: phong?.id || 0,
      tenPhong: phong?.tenPhong || "",
      khach: phong?.khach || "",
      phongNgu: phong?.phongNgu || "",
      giuong: phong?.giuong || "",
      phongTam: phong?.phongTam || "",
      giaTien: phong?.giaTien || "",
      maViTri: phong?.maViTri || "",
      hinhAnh: phong?.hinhAnh || "",
      moTa: phong?.moTa || "",
      tienNghi: phong?.tienNghi || [],
    },
    onSubmit: (values) => {
      console.log(values)
      mutation.mutate(
        { id: parseId, payload: values },
        {
          onSuccess: () => {
            toast.success("Update room successfully");
            navigate(PATH.quanlythongtinphong);
          },
        }
      );
    },
  });

  const onChangeCheckboxGroup = (checkedValues) => {
    formik.setFieldValue("tienNghi", checkedValues);
  };

  const onChange = (checkedValues) => {
    formik.setFieldValue("tienNghi", checkedValues);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Tên phòng</label>
        <Input
          name="tenPhong"
          value={formik.values.tenPhong}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Số khách</label>
        <Input
          type="number"
          name="khach"
          value={formik.values.khach}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Số phòng ngủ</label>
        <Input
          type="number"
          name="phongNgu"
          value={formik.values.phongNgu}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Số giường</label>
        <Input
          type="number"
          name="giuong"
          value={formik.values.giuong}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Phòng tắm</label>
        <Input
          type="number"
          name="phongTam"
          value={formik.values.phongTam}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Giá tiền 1 đêm</label>
        <Input
          type="number"
          name="giaTien"
          value={formik.values.giaTien}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Mã vị trí</label>
        <Input
          type="number"
          name="maViTri"
          value={formik.values.maViTri}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Hình ảnh khách sạn (URL)</label>
        <Input
          name="hinhAnh"
          value={formik.values.hinhAnh}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Mô tả về phòng thuê</label>
        <Input.TextArea
          name="moTa"
          value={formik.values.moTa}
          onChange={formik.handleChange}
          rows={4}
        />
      </div>
      <div>
        <Checkbox.Group
          defaultValue={[
            "mayGiat",
            "tivi",
            "doXe",
            "hoBoi",
            "dieuHoa",
            "banLa",
            "banUi",
            "bep",
            "wifi",
          ]}
          style={{
            width: "100%",
          }}
          onChange={onChange}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="mayGiat">Máy giặt</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="banLa">Bàn là</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="banUi">Bàn ủi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="tivi">Ti vi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="dieuHoa">Điều hòa</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="bep">Bếp</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="doXe">Bãi đỗ xe</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="hoBoi">Hồ bơi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="wifi">Wi fi</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
      <Button className="mt-5" type="primary" htmlType="submit">
        Cập Nhật
      </Button>
    </form>
  );
};
