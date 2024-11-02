import React from "react";
import { useDateFileContext } from "context/DateFileContext";

const DateAndFileInput: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fileName,
    setFileName,
  } = useDateFileContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="date-file-input">
      <input
        type="file"
        onChange={handleFileChange}
        placeholder="Search by filename"
        className="date-file-input__file"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-file-input__date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-file-input__date"
      />
    </div>
  );
};

export default DateAndFileInput;
