import React from "react";
import { useDataSettingContext } from "context/DataSettingContext";
import { ConfigProvider, DatePicker, DatePickerProps, Select } from "antd";

const DateAndFileInput: React.FC = () => {
  const inputWidth = 200;

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fileName,
    setFileName,
  } = useDataSettingContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {},
        },
      }}
    >
      <div className="date-file-input">
        <div>
          <label>Choose file : </label>
          <Select
            showSearch
            style={{ width: inputWidth * 2 + 20, height: 45 }}
            placeholder="Search by filename"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
            ]}
          />
        </div>
        <div>
          <div>
            <label>Start date : </label>
            <DatePicker
              style={{ width: inputWidth, height: 45 }}
              onChange={onChange}
            />
          </div>
          <div>
            <label>End date : </label>
            <DatePicker
              style={{ width: inputWidth, height: 45 }}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DateAndFileInput;
