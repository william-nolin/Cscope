import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { HomeFilled, ReloadOutlined } from "@ant-design/icons";
import { useDataSettingContext } from "context/DataSettingContext";
import { syncRepositoryById } from "api";

const MainLayout: React.FC = () => {
  const { repositoryId, setRepository } = useDataSettingContext();
  const handleReloadEvent = () => {
    const fetchData = async () => {
      if (repositoryId) {
        const repo = await syncRepositoryById(repositoryId);
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
            <h1>Visualisation</h1>
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
