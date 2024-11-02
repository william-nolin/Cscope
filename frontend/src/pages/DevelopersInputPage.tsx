import React from "react";
import { useDateFileContext } from "../context/DateFileContext";
import "assets/styles/developersInput.scss";
import DateAndFileInput from "components/DateAndFileInput";

const DevelopersInputPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDateFileContext();

  return (
    <div className="two-side-structure">
      <div className="page">
        <h2>Developer's input</h2>
        <div className="visualization-placeholder">
          [Graph Visualization Placeholder]
        </div>
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default DevelopersInputPage;
