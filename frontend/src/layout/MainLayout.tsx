import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { DataSettingProvider } from "provider/DataSettingProvider";
import { HomeFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const MainLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return (
      <DataSettingProvider repoId={id}>
        <div className="back-svg-forme">
          <div className="main-layout">
            <header>
              <div>
                <h1>Visualisation</h1>
                <NavLink to="/">
                  <HomeFilled />
                </NavLink>
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
      </DataSettingProvider>
    );
  } else {
    return <></>;
  }
};

export default MainLayout;
