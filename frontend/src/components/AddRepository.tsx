import React from "react";
import "assets/styles/addRepository.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AddRepository: React.FC = () => {
  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      <p className="cscope__subtitle">Insert repository URL</p>
      <div className="cscope__search">
        <Input className="cscope__input" placeholder="URL" />
      </div>
    </div>
  );
};

export default AddRepository;
