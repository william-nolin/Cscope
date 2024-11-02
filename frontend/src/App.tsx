import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";
import "assets/styles/_global.scss";

const App: React.FC = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
