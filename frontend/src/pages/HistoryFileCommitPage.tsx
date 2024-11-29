import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";
import MotionChartDisplay from "components/MotionChartDisplay";
import { FileHistoryCommit } from "models/FileHistoryCommit";

import { fileHistoryByDate } from "api";
import { filterByDate } from "utils/tooltipHelper";

const HistoryFileCommitPage: React.FC = () => {
  const [data, setData] = useState<FileHistoryCommit[]>([]);
  const [filterData, setFilterData] = useState<FileHistoryCommit[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const { repositoryId, startDate, endDate, fileName } =
    useDataSettingContext();

  useEffect(() => {
    async function fetchData() {
      const result = await fileHistoryByDate(
        Number(repositoryId),
        startDate,
        endDate
      );
      setData(result);
      setReady(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(
      data.filter((item: any) => filterByDate(item.Date, startDate, endDate))
    );
  }, [data, startDate, endDate]);

  return (
    <div className="two-side-structure">
      <div className="page">
        {ready ? (
          <MotionChartDisplay fileHistoryCommitData={filterData} />
        ) : null}
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default HistoryFileCommitPage;
