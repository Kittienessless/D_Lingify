import react from "react";
import styled from "styled-components";
import { Tabs as BaseTabs, Grid } from "antd";
import { GetAllUsers } from "./GetAllUsers";
import { GetAllLangs } from "./GetAllLangs";
import GetStatistic from "./GetStatistic";
import { Space } from "shared/ui/space";
import { useTranslation } from "react-i18next";
const { useBreakpoint } = Grid;

const Tabs = styled(BaseTabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.font} !important;
    font-weight: 400;
  }
  .ant-tabs-tab {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;
    & :hover {
      color: ${({ theme }) => theme.colors.fontHover} !important;
    }
  }

  .ant-tabs-tab-active {
    color: ${({ theme }) => theme.colors.font} !important;
  }
`;

const ProfileDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.font};
  max-width: 100vw;
  min-width: 20vw;
`;

export const AdminDashBoard = () => {
  const screens = useBreakpoint();
  const { t } = useTranslation();

  const isVertical = screens.lg || screens.xl || screens.xxl;

  const tabPosition = isVertical ? "left" : "top";

const items = [
  {
    label: t("admin.text1"),
    children: <GetAllUsers></GetAllUsers>,
    key: "1",
  },
  {
    label: t("admin.text2"),
    children: <GetAllLangs></GetAllLangs>,
    key: "2",
  },
  {
    label: t("admin.text3"),
    children: <GetStatistic></GetStatistic>,
    key: "3",
  },
];
  return (
    <ProfileDiv>
      <Tabs tabPosition={tabPosition} items={items} />
    </ProfileDiv>
  );
};
