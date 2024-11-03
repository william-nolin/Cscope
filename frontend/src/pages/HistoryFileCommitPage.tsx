import React from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";
import MotionChartDisplay from "components/MotionChartDisplay";

const HistoryFileCommitPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDataSettingContext();

  return (
    <div className="two-side-structure">
      <div className="page">
        <MotionChartDisplay />
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default HistoryFileCommitPage;
