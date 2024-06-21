import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quanLyUserServices } from "../../../services/QuanLyUser";
import { toast } from "react-toastify";
import { quanLyNguoiDungAction } from "../../../store/quanLyNguoiDung/slice";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const Avatar = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const dispatch = useDispatch();
  const [imgURL, setImgURL] = useState(userLogin?.user.avatar);
  useEffect(() => {
    setImgURL(userLogin?.user.avatar);
  }, [userLogin]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setImgURL(reader.result);
    });

    const formData = new FormData();
    formData.append("formFile", file);

    quanLyUserServices
      .uploadHinh(formData)
      .then((res) => {
        const newAvatarURL = res.data.content.avatar;
        dispatch(quanLyNguoiDungAction.updateUserAvatar(newAvatarURL));
        setImgURL(newAvatarURL);
        toast.success("Avatar đã được cập nhật.");

      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img
        src={imgURL}
        className="w-20 h-20 md:w-36 md:h-36 xl:w-36 xl:h-36 lg:w-36 lg:h-36 object-cover rounded-full mx-auto my-5"
        alt="avatar"
      />
      <form onSubmit={onSubmit}>
        <p>{userLogin?.user.name}</p>
        <Button className="mt-[15px]" onClick={showModal}>
          Upload Avatar
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input
          className="my-2"
          type="file"
          onChange={onChange}
          accept="image/png, image/gif, image/jpeg"
        />
        </Modal>
        <br />
      </form>
    </div>
  );
};
