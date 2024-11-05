import { DataSettingContext } from "context/DataSettingContext";
import React, { useState, ReactNode } from "react";

export const DataSettingProvider: React.FC<{
  children: ReactNode;
  repoId: string;
}> = ({ children, repoId }) => {
  const [repositoryId, setRepositoryId] = useState<string>(repoId);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
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
