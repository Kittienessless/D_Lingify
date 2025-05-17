import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu as BaseMenu } from "antd";
import styled from "styled-components";

import {
  InstagramOutlined,
  PinterestOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
 type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "instagram",
    icon: <InstagramOutlined />,
  },
  {
    label: (
      <a
        href="https://ru.pinterest.com/"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "pinterest",
    icon: <PinterestOutlined />,
  },
  {
    label: (
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "youtube",
    icon: <YoutubeOutlined />,
  },
];

const Menu = styled(BaseMenu)`
  .ant-menu-item-selected {
    border-bottom: none !important;
    color: rgb(0, 12, 27) !important;
      transition: none !important;

      border-bottom-width: 0px;  
      border-bottom-color: transparent;
  }
& .ant-menu-item{
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
     .ant-menu-horizontal, .ant-menu-item::after, .ant-menu-submenu::after {
    border: none !important;
 }
`;
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  justifyContent: "center",
  minHeight: 50,
  backgroundColor: "transparent",
  alignContent: "center", 
  
 };

export const FooterWidget: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div  style={footerStyle}>
        <Menu
          style={footerStyle}
          onClick={({ key }) => {
            navigate(key);
          }}
          mode="horizontal"
          items={items}
        />
      </div>
    </>
  );
};
