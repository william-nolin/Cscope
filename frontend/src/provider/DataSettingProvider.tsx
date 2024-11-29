import { DataSettingContext } from "context/DataSettingContext";
import React, { useState, ReactNode, useEffect } from "react";
import dayjs from "dayjs";
import { getFilesRepository } from "api";

export const DataSettingProvider: React.FC<{
  children: ReactNode;
  repoId: string;
}> = ({ children, repoId }) => {
  const [repositoryId, setRepositoryId] = useState<string>(repoId);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [filePath, setFilePath] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilesRepository(Number(repositoryId));
      setFiles(["", ...data]);
    };

    fetchData();
  }, [repositoryId]);

  return (
    <DataSettingContext.Provider
      value={{
        repositoryId,
        setRepositoryId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filePath,
        setFilePath,
        files,
        setFiles,
      }}
    >
      {children}
    </DataSettingContext.Provider>
  );
};
