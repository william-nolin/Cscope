import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";
import MotionChartDisplay from "components/MotionChartDisplay";
import { FileHistoryCommit } from "models/FileHistoryCommit";

import { fileHistoryByDate, getFileData } from "api";
import {
  filterByDate,
  getFileExtension,
  getFileName,
} from "utils/tooltipHelper";
import { Spin } from "antd";
import { FileData } from "models/FileData";
import { extDataMine } from "data/ExtDataMine";
import FileTypeChangeFilter from "components/FileTypeChangeFilter";

const HistoryFileCommitPage: React.FC = () => {
  const [data, setData] = useState<FileHistoryCommit[]>([]);
  const [dateFilterData, setDateFilterData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const { repository, startDate, endDate, filePath } = useDataSettingContext();
  const [typeFiles, setTypeFiles] = useState<string[]>([]);
  const [selectfilterTypeFiles, setSelectFilterTypeFiles] = useState<string[]>(
    []
  );

  const identifyFileType = (filePath: string): string => {
    const mimeType = extDataMine.find(
      ({ ext }) => ext === getFileExtension(getFileName(filePath))
    );
    return mimeType?.mime || "unknown";
  };

  useEffect(() => {
    async function fetchData() {
      if (repository) {
        const result = await fileHistoryByDate(
          Number(repository.id),
          startDate,
          endDate
        );
        setData(result);
        setReady(true);
      }
    }

    fetchData();
  }, [repository]);

  useEffect(() => {
    const newDateFilterData = data.filter((item: FileHistoryCommit) => {
      return (
        filterByDate(item.Date.toString(), startDate, endDate) &&
        (filePath === "" || item.fileName === filePath)
      );
    });

    const setExtTypeFilterData = newDateFilterData.map(
      (item: FileHistoryCommit) => {
        return { ...item, filetype: identifyFileType(item.fileName) };
      }
    );

    const noDuplicateListExtType = Array.from(
      new Set(setExtTypeFilterData.map((item) => item.filetype))
    );

    setTypeFiles(noDuplicateListExtType);

    setDateFilterData(setExtTypeFilterData);
  }, [data, startDate, endDate, filePath]);

  useEffect(() => {
    const newFilterData = dateFilterData.filter((item: any) => {
      return selectfilterTypeFiles.length > 0
        ? selectfilterTypeFiles.includes(item.filetype)
        : true;
    });
    setFilterData(newFilterData);
  }, [dateFilterData, selectfilterTypeFiles]);

  return (
    <div className="two-side-structure">
      <div className="page">
        {ready ? (
          <MotionChartDisplay fileHistoryCommitData={filterData} />
        ) : (
          <Spin size="large" />
        )}
      </div>
      <div>
        <DateAndFileInput />
        <FileTypeChangeFilter
          fileTypes={typeFiles}
          filterTypeFiles={selectfilterTypeFiles}
          setFilterTypeFiles={setSelectFilterTypeFiles}
        />
      </div>
    </div>
  );
};

export default HistoryFileCommitPage;
