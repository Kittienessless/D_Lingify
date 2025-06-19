import React, { useContext, useEffect } from "react";
import ProfileCard from "shared/ui/profileCard/ui/ProfileCard.tsx";
import Translate from "../../../features/translation/ui/Translate.tsx";
import LanguageList from "widgets/languageWidget/ui/LanguageList";
import { PreferencesWidget } from "widgets/preferencesWidget/ui/PreferencesWidget";
import styled from "styled-components";
import { Tabs as BaseTabs, Grid } from "antd";
import { GenerateText } from "widgets/generateText/GenerateText";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { UserContext } from "app/providers/index.tsx";
import { Loader } from "shared/ui/loaders/loader.tsx";
import { LoginWidget } from "widgets/loginWidget/index.ts";
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
`;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();

  const isVertical = screens.lg || screens.xl || screens.xxl;

  const tabPosition = isVertical ? "left" : "top";
  const items = [
    {
      label: t("profile.Tabs1"),
      children: <ProfileCard />,
      key: "1",
    },
    {
      label: t("profile.Tabs2"),
      children: <LanguageList />,
      key: "2",
    },
    {
      label: t("profile.Tabs3"),
      children: <Translate />,
      key: "3",
    },
    {
      label: t("profile.Tabs4"),
      children: <GenerateText />,
      key: "4",
    },
    {
      label: t("profile.Tabs5"),
      children: <PreferencesWidget />,
      key: "5",
    },
  ];
  return (
    <>
      <ProfileDiv>
        <Tabs tabPosition={tabPosition} items={items} />
      </ProfileDiv>
    </>
  );
};
export default observer(Profile);
