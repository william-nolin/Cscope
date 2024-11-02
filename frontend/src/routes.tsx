import MainLayout from "layout/MainLayout";
import ChangeVolumePage from "pages/ChangeVolumePage";
import DevelopersInputPage from "pages/DevelopersInputPage";
import EvolutionFileCommitPage from "pages/EvolutionFileCommitPage";
import StartProjectPage from "pages/StartProjectPage";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "repository/:id",
    element: <MainLayout />,
    children: [
      { path: "change-volume", element: <ChangeVolumePage /> },
      { path: "evolution-file", element: <EvolutionFileCommitPage /> },
      { path: "developers-input", element: <DevelopersInputPage /> },
    ],
  },
  {
    path: "/",
    element: <StartProjectPage />,
  },
];

export default routes;
