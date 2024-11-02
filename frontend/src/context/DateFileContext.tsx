import { createContext, useContext } from "react";

interface DateFileContextType {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

export const DateFileContext = createContext<DateFileContextType | undefined>(
  undefined
);

export const useDateFileContext = (): DateFileContextType => {
  const context = useContext(DateFileContext);
  if (!context) {
    throw new Error(
      "useDateFileContext must be used within a DateFileProvider"
    );
  }
  return context;
};
