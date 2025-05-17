// todo:
  //todo: 1. сделать рендер нескольких таблиц с теми настройками, что передаются от пользователя 
  //todo: 2. все поля должны быть editable 
  //todo: 3. брать данные о создании языка из стора. 









import React, { useEffect, useState, FC, useContext, useRef } from "react";
import styled from "styled-components";
import { Text } from "shared/ui/text";
import { Button } from "shared/ui/button";
import { Table, Upload, UploadFile, Radio, Empty, ConfigProvider } from "antd";
import { toast } from "react-toastify";
import { Space } from "shared/ui/space";
import { Divider } from "shared/ui/divider";
import { Checkbox } from "shared/ui/checkbox";
import { Search } from "shared/ui/featuredInputs";
import { IconButton } from "shared/ui/button/IconButton";
import { FilterIcon } from "shared/assets/FilterIcon";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";
import { SortIcon } from "shared/assets/SortIcon";
import { borderRadius } from "shared/lib/borderRadius";
import { LangAPI } from "shared/api";
import type { InputRef, TableColumnsType, TableProps } from "antd";
import { Uploader } from "features/languageCard/ui/Uploader";
import { CreateLangWidget } from "./CreateLangWidget";

const Container = styled.div`
  ${CenterAbsolutely};
  width: 80vw;
  margin: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid rgb(221, 221, 221);
  ${borderRadius.m};
`;

export interface DataType {
  key: string;
  word: string;
  translation: string;
  others?: {
    rules?: Array<string>;
    tags?: string[];
    polysemous?: boolean;
    synonym?: string[] | boolean;
  };
}
const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    /*     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
     */
  },
  getCheckboxProps: (record: DataType) => ({
    /* disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name, */
  }),
};

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  Table.EXPAND_COLUMN,
  { title: "Age", dataIndex: "age", key: "age" },
  Table.SELECTION_COLUMN,
  { title: "Address", dataIndex: "address", key: "address" },
];

export const LanguageWidget = () => {
  const [data, setData] = useState(Array<DataType>);
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);

  
  const [count, setCount] = React.useState(10000);
  const [empty, setEmpty] = React.useState(false);

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: "",
      word: "",
      translation: "",
    };
    setData([...data, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  const handleToggle = () => {
    setData(data.length ? [] : []);
  };

  const toggleButton = (
    <Button primary onClick={handleToggle}>
      Toggle Data
    </Button>
  );

  return (
    <Container>
      <Table<DataType>
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{String(record.others)}</p>
          ),
        }}
        dataSource={data}
      />
    </Container>
  );
};
