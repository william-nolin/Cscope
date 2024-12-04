import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { HomeFilled, ReloadOutlined } from "@ant-design/icons";
import { useDataSettingContext } from "context/DataSettingContext";
import { syncRepositoryById } from "api";
import { getFileName } from "utils/tooltipHelper";

const MainLayout: React.FC = () => {
  const { repository, setRepository } = useDataSettingContext();
  const handleReloadEvent = () => {
    const fetchData = async () => {
      if (repository) {
        const repo = await syncRepositoryById(repository.id);
        setRepository(repo);
      }
    };

    fetchData();
  };

  return (
    <div className="back-svg-forme">
      <div className="main-layout">
        <header>
          <div>
            <h1>
              Visualisation{" "}
              <NavLink
                target="_blank"
                to={"https://github.com/" + repository?.path}
                rel="noopener noreferrer"
              >
                {repository?.name}
              </NavLink>
            </h1>
            <div>
              <div onClick={handleReloadEvent} className="butSty1">
                <ReloadOutlined />
              </div>
              <NavLink to="/">
                <HomeFilled />
              </NavLink>
            </div>
          </div>
          <nav>
            <NavLink to="change-volume">Change volume</NavLink>
            <NavLink to="history-file">File history</NavLink>
            <NavLink to="developers-input">Developer's input</NavLink>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
