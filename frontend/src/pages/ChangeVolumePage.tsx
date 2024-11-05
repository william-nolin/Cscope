import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/changeVolume.scss";
import DateAndFileInput from "components/DateAndFileInput";
import BuddleGraphMetrics from "components/BubbleGraphMetrix";
import { MetricsProps } from "models/MetricsProps";
import SliderFilterMetrix from "components/SliderFilterMetrix";
import Project from "models/Project";
import { mockProjets } from "data/mockData";
import {
  bigFileFolderDatas,
  mediumFileFolderDatas,
  smallFileFolderDatas,
} from "data/fileFolderData";
import { FileFolderCommits } from "models/FileFolderCommits";
import BubbleGraphDisplay from "components/BubbleGraphDisplay";

const ChangeVolumePage: React.FC = () => {
  const { repositoryId, startDate, endDate, fileName } =
    useDataSettingContext();
  const [project, setProject] = useState<Project | null>(null);
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

  useEffect(() => {
    const options = [
      smallFileFolderDatas,
      mediumFileFolderDatas,
      bigFileFolderDatas,
    ];

    const foundProject = mockProjets.find(
      (p: Project) => p.id === repositoryId
    );
    if (foundProject) {
      setFileFolderDatas(options[foundProject.type]);
      setFilterMetrics({
        ...filterMetrics,
        maxCodeLine: options[foundProject.type][0].codeLines,
      });
      setProject(foundProject);
    }
  }, [repositoryId]);

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
