import React from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/developersInput.scss";
import DateAndFileInput from "components/DateAndFileInput";

const DevelopersInputPage: React.FC = () => {
  const { startDate, endDate, filePath } = useDataSettingContext();

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

export default DevelopersInputPage;
