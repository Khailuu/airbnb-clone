import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import "./style.css";
import { useGetViTri } from "../../../hooks/api/quanLyViTriApi/useGetViTri";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
  const { data: listViTri } = useGetViTri();
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const newData = listViTri?.map((item) => {
      return {
        value: item.tinhThanh,
        key: item.id,
      };
    });
    setDataSearch(newData);
  }, [listViTri]);

  const onSelect = (_, data) => {
    navigate(`${PATH.roomlist}/${data.key}`);
  };

  return (
    <AutoComplete
      onSelect={onSelect}
      size="large"
      className="iphone-6:!w-[150px] iphone-6-plus:!w-[150px] md:!w-[250px]"
      allowClear
      options={dataSearch}
      placeholder={t('enter_destination')}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
};
