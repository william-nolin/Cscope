import { DataSettingContext } from "context/DataSettingContext";
import React, { useState, ReactNode, useEffect } from "react";
import dayjs from "dayjs";
import { getFilesRepository } from "api";
import Repository from "models/repository";
import { useNavigate } from "react-router-dom";

export const DataSettingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [filePath, setFilePath] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (repository) {
        const data = await getFilesRepository(Number(repository.id));
        setFiles(["", ...data]);
      } else {
        return navigate(`/`);
      }
    };

    fetchData();
  }, [repository]);

  return (
    <DataSettingContext.Provider
      value={{
        repository,
        setRepository,
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
