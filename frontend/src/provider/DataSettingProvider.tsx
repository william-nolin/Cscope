import { DataSettingContext } from "context/DataSettingContext";
import React, { useState, ReactNode } from "react";
import dayjs from "dayjs";

export const DataSettingProvider: React.FC<{
  children: ReactNode;
  repoId: string;
}> = ({ children, repoId }) => {
  const [repositoryId, setRepositoryId] = useState<string>(repoId);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [fileName, setFileName] = useState<string>("");

  return (
    <DataSettingContext.Provider
      value={{
        repositoryId,
        setRepositoryId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fileName,
        setFileName,
      }}
    >
      {children}
    </DataSettingContext.Provider>
  );
};
