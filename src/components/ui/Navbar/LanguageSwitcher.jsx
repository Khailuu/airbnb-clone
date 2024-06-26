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
    >
      <Option value="vi">
        <Flag code="vn" />
      </Option>
      <Option value="en">
        <Flag code="us" />
      </Option>
    </Select>
  );
};
