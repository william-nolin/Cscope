import React from "react";
import { useDateFileContext } from "../context/DateFileContext";
import "assets/styles/changeVolume.scss";
import DateAndFileInput from "components/DateAndFileInput";
import BuddleGraphMetrics from "components/BubbleGraphMetrix";
import { MetricsProps } from "model/MetricsProps";

const ChangeVolumePage: React.FC = () => {
  const { startDate, endDate, fileName } = useDateFileContext();
  const bubbleMetrix: MetricsProps = {
    commitCount: 140,
    codeSize: 1055,
    mainAuthor: "Boblebri Codeur",
    modifiedDate: "1 month ago",
  };

  return (
    <div className="two-side-structure">
      <div className="page">
        <h2>Change Volume</h2>
        <div className="visualization-placeholder">
          [Graph Visualization Placeholder]
        </div>
      </div>
      <div>
        <DateAndFileInput />
        <BuddleGraphMetrics metricsProps={bubbleMetrix} />
      </div>
    </div>
  );
};

export default ChangeVolumePage;
