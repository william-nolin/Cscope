import { Label } from "@amcharts/amcharts5";
import { ConfigProvider, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

const FileTypeChangeFilter = ({
  fileTypes,
  filterTypeFiles,
  setFilterTypeFiles,
}: {
  fileTypes: string[];
  filterTypeFiles: string[];
  setFilterTypeFiles: any;
}) => {
  const inputWidth = 200;
  const [size, setSize] = useState<SizeType>("middle");

  const handleChange = (ftfs: string[]) => {
    setFilterTypeFiles(ftfs);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            paddingXXS: 18,
          },
        },
      }}
    >
      <div className="date-file-input" style={{ marginTop: 20 }}>
        <div>
          <label>Choose file type : </label>
          <Select
            mode="multiple"
            style={{ width: inputWidth * 2 + 20 }}
            value={filterTypeFiles}
            size={size}
            onChange={handleChange}
            options={fileTypes.map((type) => {
              return { value: type, label: type };
            })}
          />
        </div>
        <div>
          <div>
            <label style={{ width: 250 }}>Filter by type of change : </label>
          </div>
        </div>
        <div></div>
      </div>
    </ConfigProvider>
  );
};

export default FileTypeChangeFilter;
