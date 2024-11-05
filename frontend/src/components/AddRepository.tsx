import React, { useState } from "react";
import "assets/styles/addRepository.scss";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const AddRepository: React.FC = () => {
  const [repositoryId, setRepositoryId] = useState<number>(1728710481833);
  const navigate = useNavigate();

  const handleEnterPress = () => {
    navigate(`/repository/${repositoryId}/change-volume`);
  };
  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      <p className="cscope__subtitle">Insert repository URL</p>
      <div className="cscope__search">
        <Input
          className="cscope__input"
          placeholder="Insert URL and press enter"
          onPressEnter={handleEnterPress}
        />
      </div>
    </div>
  );
};

export default AddRepository;
