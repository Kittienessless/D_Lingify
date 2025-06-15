import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputRef,
  Popconfirm,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { UserContext } from "app/providers";
import { Loader } from "shared/ui/loaders";
import UserService from "shared/api/user/UserService";
import { Table } from "antd";
import { Text } from "shared/ui/text";
import { Space } from "shared/ui/space";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AdminService from "shared/api/user/AdminServive";

interface DataType {
  user_id: string;
  name: string;
  email: string;
  role: string;
}
type DataIndex = keyof DataType;

export const GetAllUsers = () => {
  const { store } = useContext(UserContext);

  const [data, setData] = useState<DataType[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [editingKey, setEditingKey] = useState("");

  const HandlerOnChangeRole = async (key: React.Key) => {
    await AdminService.changeRole(key);
  };

  const handleDelete = async (key: React.Key) => {
    const newData = data.filter((item) => item.user_id !== key);
    await AdminService.deleteUser(key);

    setData(newData);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    async function fetchUsers() {
      try {
        const res = await UserService.fetchAllUsers();
        setData(res.data);
      } catch (e) {}
    }

    fetchUsers();
  }, []);

  if (store.isLoading) {
    return <Loader></Loader>;
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Действия",
      key: "action",
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <Popconfirm
              title="Удалить пользователя?"
              onConfirm={() => handleDelete(record.user_id)}
            >
              <a>Удалить</a>
            </Popconfirm>
            <p></p>
            <Popconfirm
              title="Сменить роль?"
              onConfirm={() => HandlerOnChangeRole(record.user_id)}
            >
              <a>Изменить роль</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];
  const cancel = () => {
    setEditingKey("");
  };
  return (
    <>
      <Text>Список пользователей</Text>
      <Space height="m" />

      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ onChange: cancel }}
      />
    </>
  );
};
