import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";
import MotionChartDisplay from "components/MotionChartDisplay";
import { FileHistoryCommit } from "models/FileHistoryCommit";

import { fileHistoryByDate } from "api";
import {
  filterByDate,
  getFileExtension,
  getFileName,
} from "utils/tooltipHelper";
import { Spin } from "antd";
import { extDataMine } from "data/ExtDataMine";
import FileTypeChangeFilter from "components/FileTypeChangeFilter";
import { useParams } from "react-router-dom";

const HistoryFileCommitPage: React.FC = () => {
  const [data, setData] = useState<FileHistoryCommit[]>([]);
  const [pathFilterData, setPathFilterData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const {
    repository,
    repositoryId,
    setRepositoryId,
    startDate,
    endDate,
    filePath,
  } = useDataSettingContext();
  const [typeFiles, setTypeFiles] = useState<string[]>([]);
  const [selectfilterTypeFiles, setSelectFilterTypeFiles] = useState<string[]>(
    []
  );
  const { id } = useParams<{ id: string }>();

  const identifyFileType = (filePath: string): string => {
    const mimeType = extDataMine.find(
      ({ ext }) => ext === getFileExtension(getFileName(filePath))
    );
    return mimeType?.mime || "unknown";
  };

  useEffect(() => {
    if (!repositoryId) {
      setRepositoryId(Number(id));
    }
  }, [id]);

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
  }, [repository, startDate, endDate]);

  useEffect(() => {
    const newPathFilterData = data.filter((item: FileHistoryCommit) => {
      return filePath === "" || item.fileName === filePath;
    });

    const setExtTypeFilterData = newPathFilterData.map(
      (item: FileHistoryCommit) => {
        return { ...item, filetype: identifyFileType(item.fileName) };
      }
    );

    const noDuplicateListExtType = Array.from(
      new Set(setExtTypeFilterData.map((item) => item.filetype))
    );

    setTypeFiles(noDuplicateListExtType);

    setPathFilterData(setExtTypeFilterData);
  }, [data, filePath]);

  useEffect(() => {
    const newFilterData = pathFilterData.filter((item: any) => {
      return selectfilterTypeFiles.length > 0
        ? selectfilterTypeFiles.includes(item.filetype)
        : true;
    });
    setFilterData(newFilterData);
  }, [pathFilterData, selectfilterTypeFiles]);

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
