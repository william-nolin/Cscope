import { Checkbox, CheckboxProps, ConfigProvider, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";
import { useState } from "react";
import {
  categoryToEvolutionType,
  typeEvolutionOptions,
} from "utils/tooltipHelper";
import { CategorizedFileTypes } from 'models/CategorizedFileTypes'

const CheckboxGroup = Checkbox.Group;

const FileTypeChangeFilter = ({
  fileTypes,
  groupedFileTypes,
  filterTypeFiles,
  setFilterTypeFiles,
  checkedList,
  setCheckedList,
}: {
  fileTypes: string[];
  groupedFileTypes: CategorizedFileTypes;
  filterTypeFiles: string[];
  setFilterTypeFiles: any;
  checkedList: string[];
  setCheckedList: any;
}) => {
  const inputWidth = 200;
  const [size, setSize] = useState<SizeType>("middle");

  const handleChange = (ftfs: string[]) => {
    setFilterTypeFiles(ftfs);
    console.log(groupedFileTypes);
  };

  const checkAll = typeEvolutionOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < typeEvolutionOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? typeEvolutionOptions : []);
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
        <div>
          <Checkbox
            style={{ marginTop: 10 }}
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            All files
          </Checkbox>
          <CheckboxGroup value={checkedList} onChange={onChange}>
            {typeEvolutionOptions.map((option) => (
              <ConfigProvider
                theme={{
                  components: {
                    Checkbox: {
                      colorPrimary: categoryToEvolutionType.get(option),
                      colorPrimaryHover: categoryToEvolutionType.get(option),
                    },
                  },
                }}
                key={option}
              >
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              </ConfigProvider>
            ))}
          </CheckboxGroup>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default FileTypeChangeFilter;
