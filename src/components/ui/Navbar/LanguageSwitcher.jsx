import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const { Option } = Select;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 60 }}
      onChange={changeLanguage}
      aria-label="flag"
    >
      <Option value="en">
        <Flag code="us" alt="flag" aria-label="Flag england" />
      </Option>
      <Option value="vi">
        <Flag code="vn" alt="flag" aria-label="Flag VietNam" />
      </Option>
    </Select>
  );
};
