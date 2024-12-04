import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/changeVolume.scss";
import DateAndFileInput from "components/DateAndFileInput";
import BuddleGraphMetrics from "components/BubbleGraphMetrix";
import { MetricsProps } from "models/MetricsProps";
import SliderFilterMetrix from "components/SliderFilterMetrix";
import { FileFolderCommits } from "models/FileFolderCommits";
import BubbleGraphDisplay from "components/BubbleGraphDisplay";
import { useParams } from "react-router-dom";
import { getFileOverTime } from "api";

const ChangeVolumePage: React.FC = () => {
  const { repository, repositoryId, setRepositoryId, startDate, endDate } =
    useDataSettingContext();
  const [filterMetrics, setFilterMetrics] = useState<{
    codeLines: number;
    maxCodeLine: number;
  }>({
    codeLines: 0,
    maxCodeLine: 1000,
  });
  const [fileFolderDatas, setFileFolderDatas] = useState<FileFolderCommits[]>(
    []
  );

  const bubbleMetrix: MetricsProps = {
    commitCount: 140,
    codeSize: 1055,
    mainAuthor: "Boblebri Codeur",
    modifiedDate: "1 month ago",
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!repositoryId) {
      setRepositoryId(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (repository) {
      const fetchData = async () => {
        const data = await getFileOverTime(repository.id, startDate, endDate);
        console.log(data);
      };

      fetchData();
    }
  }, [repository, startDate, endDate]);

  return (
    <div className="two-side-structure">
      <div className="page">
        <BubbleGraphDisplay
          filterMetrics={filterMetrics}
          fileFolderDatas={fileFolderDatas}
        />
      </div>
      <div>
        <DateAndFileInput />
        <SliderFilterMetrix
          filterMetrics={filterMetrics}
          setFilterMetrics={setFilterMetrics}
        />
        <BuddleGraphMetrics metricsProps={bubbleMetrix} />
      </div>
    </div>
  );
};

export default ChangeVolumePage;
