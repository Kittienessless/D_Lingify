import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  HomeOutlined,
  NodeIndexOutlined,
  PlusCircleOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./header.css";
import { Menu as BaseMenu } from "antd";
import { EditIcon } from "shared/assets/EditIcon";
import { FireIcon } from "shared/assets/FireIcon";
import { LogoIcon } from "shared/assets/LogoIcon";
import { LogoNew } from "shared/assets/LogoNew";
import styled from "styled-components";
import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const Menu = styled(BaseMenu)`
  .ant-menu-title-content {
    color: ${({ theme }) => theme.colors.font} !important;
  }

  .ant-tabs-tab-active {
    color: ${({ theme }) => theme.colors.font} !important;
  }
  .ant-menu-item-selected {
    border-bottom: none !important;
    transition: none !important;
    color: ${({ theme }) => theme.colors.font} !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item {
    border-bottom: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item:hover {
    border-bottom: none !important;
    color: gray !important;
    content: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }

  & .ant-menu-item-selected::after {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item-selected::before {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }

  & .ant-menu-item:hover::after {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item-selected:hover {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item-selected:hover::after {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;
    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  & .ant-menu-item:hover::before {
    content: none !important;
    border-bottom: none !important;
    transition: none !important;

    border-bottom-width: 0px;
    border-bottom-color: transparent;
  }
  .ant-menu-horizontal,
  .ant-menu-item::after,
  .ant-menu-submenu::after {
    border: none !important;
    color: ${({ theme }) => theme.colors.font};
  }
`;

type MenuItem = Required<MenuProps>["items"][number];


const HeaderWidget: React.FC = () => {
    const { t } = useTranslation();

  const navigate = useNavigate();
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    justifyContent: "right",

    backgroundColor: "transparent",
    alignContent: "center",
    width: "100%",
  };
  const { store } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
      store.checkAdmin();
    }
  }, [store.isAuth, store.isAdmin]);
const MenuNotAuth: MenuItem[] = [
  {
    label: t("Header.text1"),
    key: "Handbook",
    icon: <PlusCircleOutlined />,
  },

  {
    label: t("Header.text2"),
    key: "About",
    icon: <FireIcon />,
  },
];

const itemsAuth: MenuItem[] = [
  {
    label: t("Header.text3"),
    key: "Language",
    icon: <EditOutlined />,
  },
  {
    label: t("Header.text1"),
    key: "Handbook",
    icon: <PlusCircleOutlined />,
  },
  {
    label: t("Header.text4"),
    key: "Profile",
    icon: <UserOutlined />,
  },
  {
    label: t("Header.text2"),
    key: "About",
    icon: <FireIcon />,
  },
];
const items: MenuItem[] = [
  {
    label: t("Header.text3"),
    key: "Language",
    icon: <EditOutlined />,
  },
  {
    label: t("Header.text1"),
    key: "Handbook",
    icon: <PlusCircleOutlined />,
  },
  {
    label: t("Header.text4"),
    key: "Profile",
    icon: <UserOutlined />,
  },
  {
    label: t("Header.text2"),
    key: "About",
    icon: <FireIcon />,
  },
  {
    label:t("Header.text5"),
    key: "Admin",
    icon: <NodeIndexOutlined />,
  },
];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "50px",
      }}
    >
      <Link to={"/"}>
        <LogoNew />
      </Link>
      {!store.isAuth && (
        <Menu
          style={headerStyle}
          onClick={({ key }) => {
            navigate(key);
          }}
          mode="horizontal"
          items={MenuNotAuth}
        />
      )}
      {store.isAuth && !store.isAdmin && (
        <Menu
          style={headerStyle}
          onClick={({ key }) => {
            navigate(key);
          }}
          mode="horizontal"
          items={itemsAuth}
        />
      )}
      {store.isAuth && store.isAdmin && (
        <Menu
          style={headerStyle}
          onClick={({ key }) => {
            navigate(key);
          }}
          mode="horizontal"
          items={items}
        />
      )}
    </div>
  );
};

export default observer(HeaderWidget);
