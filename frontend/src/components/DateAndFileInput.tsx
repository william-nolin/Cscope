import React from "react";
import { useDataSettingContext } from "context/DataSettingContext";
import { ConfigProvider, DatePicker, DatePickerProps, Select } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

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

  const onStartDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (dateString) {
      const newStartDate = dateString.toString();

      if (endDate && dayjs(newStartDate).isAfter(dayjs(endDate))) {
        alert("Start date cannot be later than the end date.");
      } else {
        setStartDate(dateString.toString());
      }
    }
  };

  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (dateString) {
      const newEndDate = dateString.toString();

      if (startDate && dayjs(newEndDate).isBefore(dayjs(startDate))) {
        alert("End date cannot be earlier than the start date.");
      } else {
        setEndDate(dateString.toString());
      }
    }
  };

  const onDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    }
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
            <label style={{ width: 200 }}>Start date : </label>
          </div>
          <div>
            <label>End date : </label>
          </div>
        </div>
        <div>
          <RangePicker
            style={{ width: 420, height: 45 }}
            value={[dayjs(startDate), dayjs(endDate)]}
            onChange={onDateChange}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DateAndFileInput;
