import React, { useState } from "react";
import "assets/styles/addRepository.scss";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const AddRepository: React.FC = () => {
  const [repositoryId, setRepositoryId] = useState<number>(1287944);
  const navigate = useNavigate();

  const handleEnterPress = () => {
    // Rediriger vers la route dynamique avec l'ID spécifié
    navigate(`/repository/${repositoryId}`);
  };
  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      <p className="cscope__subtitle">Insert repository URL</p>
      <div className="cscope__search">
        <Input
          className="cscope__input"
          placeholder="URL"
          onPressEnter={handleEnterPress}
        />
      </div>
    </div>
  );
};

export default AddRepository;
