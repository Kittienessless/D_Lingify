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
import { VK } from "shared/assets/VK";
import { GitHubIcon } from "shared/assets/GitHubIcon";
import { Telegram } from "shared/assets/Telegram";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <a
        href="https://vk.com/id143051280"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "VK",
    icon: <VK />,
  },
  {
    label: (
      <a
        href="https://t.me/Kittienessless"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "Telegram",
    icon: <Telegram />,
  },
  {
    label: (
      <a
        href="https://github.com/Kittienessless/D_Lingify"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "GitHub",
    icon: <GitHubIcon />,
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
  }
  & svg {
    width: 1.2em;
  }
  & svg :hover {
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
      <div style={footerStyle}>
        <Menu
          style={footerStyle}
          onClick={({ key }) => {
            if (key === "GitHub") {
              window.open(
                "https://github.com/Kittienessless/D_Lingify",
                "_blank"
              );
            }
            if (key === "VK") {
              window.open("https://vk.com/id143051280", "_blank");
            }
            if (key === "Telegram") {
              window.open("https://t.me/Kittienessless", "_blank");
            }
          }}
          mode="horizontal"
          items={items}
        />
      </div>
    </>
  );
};
