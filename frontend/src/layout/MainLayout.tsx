import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { DateFileProvider } from "provider/DateFileProvider";
import { HomeFilled } from "@ant-design/icons";

const MainLayout: React.FC = () => {
  return (
    <DateFileProvider>
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
              <NavLink to="evolution-file">File evolution</NavLink>
              <NavLink to="developers-input">Developer's input</NavLink>
            </nav>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </DateFileProvider>
  );
};

export default MainLayout;
