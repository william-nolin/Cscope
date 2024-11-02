import { DateFileContext } from "context/DateFileContext";
import React, { useState, ReactNode } from "react";

export const DateFileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  return (
    <DateFileContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fileName,
        setFileName,
      }}
    >
      {children}
    </DateFileContext.Provider>
  );
};
