import React, { useState } from "react";
import "assets/styles/addRepository.scss";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

import { searchRepositoryByUrl } from "api";

const AddRepository: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleEnterPress = async () => {
    const result = await searchRepositoryByUrl(url);

    if (result.repository) {
      return navigate(`/repository/${result.repository.id}/change-volume`);
    }

    if (result.remoteRepository) {
      console.log(result.remoteRepository)
      alert(`repository: ${result.remoteRepository.url} exists, but not yet analyzed.`)
    } else {
      alert(`repository: ${url} does not exists.`)
    }
  };

  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      <p className="cscope__subtitle">Insert repository URL</p>
      <div className="cscope__search">
        <Input
          className="cscope__input"
          value={url}
          placeholder="Insert URL and press enter"
          onPressEnter={handleEnterPress}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddRepository;
