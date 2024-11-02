import React from "react";
import { useDateFileContext } from "../context/DateFileContext";
import "assets/styles/evolutionFileCommit.scss";

const EvolutionFileCommitPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDateFileContext();

  return (
    <div className="page">
      <h2>Change Volume</h2>
      <div className="visualization-placeholder">
        [Graph Visualization Placeholder]
      </div>
    </div>
  );
};

export default EvolutionFileCommitPage;
