import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { HomeFilled } from "@ant-design/icons";

const MainLayout: React.FC = () => {
  return (
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
  );
};

export default MainLayout;
