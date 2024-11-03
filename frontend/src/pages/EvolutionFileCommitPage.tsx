import React from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";

const EvolutionFileCommitPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDataSettingContext();

  return (
    <div className="two-side-structure">
      <div className="page">
        <div className="visualization-placeholder">
          [Graph Visualization Placeholder]
        </div>
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default EvolutionFileCommitPage;
