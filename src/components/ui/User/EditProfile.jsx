import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { quanLyUserServices } from '../../../services/QuanLyUser';
import { useFormik } from 'formik';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { LOCAL_USER_LOGIN_KEY, PATH } from '../../../constant';
import moment from 'moment';
import { useEditNguoiDung } from '../../../hooks/api/quanLyNguoiDungApi/useEditNguoiDung';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyNguoiDungAction } from '../../../store/quanLyNguoiDung/slice';
import dayjs from 'dayjs';

export const EditProfile = () => {
  const { id } = useParams();
  const parseId = parseInt(id);
  const [user, setUser] = useState(null);
  const mutation = useEditNguoiDung();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.quanLyNguoiDung);
  const [componentSize, setComponentSize] = useState("default");
  const [disable, setDisable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    quanLyUserServices.getNguoiDungTheoId(parseId).then((res) => {
      setUser(res.data?.content);
    });
  }, [parseId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?.id || 0,
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthday: user?.birthday || '',
      gender: user?.gender || true,
      role: user?.role || '',
      avatar: user?.avatar || "",
      password: user?.password || "",
    },
    onSubmit: values => {
      const token = userLogin.userLogin.token
      mutation.mutate({ id: user?.id, payload: values }, {
        onSuccess: () => {
          const profile = {
            token,
            user: values
          }
          dispatch(quanLyNguoiDungAction.updateUserLogin({
            ...profile
          }));
          localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(profile))
          toast.success("Cập nhật thông tin thành công!");
          setIsEditing(false); // Hide update button and show edit button
          setDisable(true); // Disable form fields
        },
        onError: (err) => {
          toast.error(err);
        }
      });
    }
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleBtnChinhSua = () => {
    setDisable(false);
    setIsEditing(true);
  };
  const handleChangeDatePicker = (date) => {
    console.log(date)
    console.log(date.format("DD/MM/YYYY"))
    if (date) {
      formik.setFieldValue("birthday", date.format("DD/MM/YYYY"));
    } else {
      formik.setFieldValue("birthday", null);
    }
  };

  return (
    <div className='container mx-auto my-[40px]'>
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Cập nhật thông tin: 
      </h2>
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
        <Form.Item label="Id">
          <Input name="id" disabled value={formik.values.id} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Name">
          <Input name="name" disabled={disable} value={formik.values.name} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" disabled={disable} value={formik.values.email} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Phone">
          <Input name="phone" disabled={disable} value={formik.values.phone} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker 
            disabled={disable}
            name="birthday" 
            value={dayjs(formik.values.birthday ,"DD/MM/YYYY")} 
            format='DD-MM-YYYY'
            onChange={handleChangeDatePicker} 
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group disabled={disable} name="gender" value={formik.values.gender} onChange={formik.handleChange}>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Role">
          <Input name="role" disabled={disable} value={formik.values.role.toUpperCase()} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item>
          <Button 
            className={`bg-rose-500 text-white rounded-[6px] ${!isEditing ? 'hidden' : ''}`} 
            type="primary" 
            htmlType="submit"
            onClick={() => setDisable(false)}
            loading={mutation.isPending}
          >
            Cập Nhật
          </Button>
          <Button 
            className={`bg-rose-500 text-white rounded-[6px] ${isEditing ? 'hidden' : ''}`} 
            type="primary" 
            onClick={handleBtnChinhSua}
          >
            Chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
