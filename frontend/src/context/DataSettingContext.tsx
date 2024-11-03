import { createContext, useContext } from "react";

interface DataSettingContextType {
  repositoryId: string;
  setRepositoryId: (id: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

export const DataSettingContext = createContext<
  DataSettingContextType | undefined
>(undefined);

export const useDataSettingContext = (): DataSettingContextType => {
  const context = useContext(DataSettingContext);
  if (!context) {
    throw new Error(
      "useDateFileContext must be used within a DateFileProvider"
    );
  }
  return context;
};
