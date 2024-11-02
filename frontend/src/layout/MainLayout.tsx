import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "assets/styles/mainLayout.scss";
import { DateFileProvider } from "provider/DateFileProvider";

const MainLayout: React.FC = () => {
  return (
    <DateFileProvider>
      <div className="back-svg-forme">
        <div className="main-layout">
          <header>
            <h1>Visualisation</h1>
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
