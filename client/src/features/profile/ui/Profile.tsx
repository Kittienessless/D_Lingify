import React from "react";
import  ProfileCard  from "shared/ui/profileCard/ui/ProfileCard.tsx";
import  Translate from "../../../features/translation/ui/Translate.tsx";
import LanguageList  from "widgets/languageWidget/ui/LanguageList";
import { PreferencesWidget } from "widgets/preferencesWidget/ui/PreferencesWidget";
import styled from "styled-components";
import { Tabs as BaseTabs } from "antd";
import { GenerateText } from "widgets/generateText/GenerateText";

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

const items = [
  {
    label: "Профиль",
    children: <ProfileCard />,
    key: "1",
  },
  {
    label: "Мои языки",
    children: <LanguageList />,
    key: "2",
  },
  {
    label: "Перевод",
    children: <Translate />,
    key: "3",
  },
  {
    label: "Генерация текста",
    children: <GenerateText />,
    key: "4",
  },
  {
    label: "Настройки",
    children: <PreferencesWidget />,
    key: "5",
  },

];

const ProfileDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Profile: React.FC = () => {
  return (
    <ProfileDiv>
      <Tabs tabPosition={"left"} items={items} />
    </ProfileDiv>
  );
};
