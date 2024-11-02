import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import DateAndFileInput from "../components/DateAndFileInput";
import "assets/styles/mainLayout.scss";
import { DateFileProvider } from "provider/DateFileProvider";

const MainLayout: React.FC = () => {
  return (
    <DateFileProvider>
      <div className="main-layout">
        <header className="main-layout__header">
          <h1>Visualisation</h1>
          <nav className="main-layout__nav">
            <NavLink to="/change-volume">Change volume</NavLink>
            <NavLink to="/evolution-file">Change impact</NavLink>
            <NavLink to="/developers-input">Developer's input</NavLink>
          </nav>
        </header>
        <DateAndFileInput />
        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>
    </DateFileProvider>
  );
};

export default MainLayout;
