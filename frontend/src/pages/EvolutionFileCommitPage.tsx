import React from "react";
import { useDateFileContext } from "../context/DateFileContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";

const EvolutionFileCommitPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDateFileContext();

  return (
    <div className="two-side-structure">
      <div className="page">
        <h2>File evolution</h2>
        <div className="visualization-placeholder">
          [Graph Visualization Placeholder]
        </div>
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default EvolutionFileCommitPage;
