import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table, Button, Input } from "antd";
import languageService from "shared/api/language/languageService";
import { ILanguage } from "entities/language";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import { Space } from "shared/ui/space";
import { borderRadius } from "shared/lib/borderRadius";
import { Tabs as BaseTabs, Grid } from "antd";
import { Grammar } from "./Grammar";
import { Dictionary } from "./Dictionary";
import { LanguagePreferences } from "./LanguagePreferences";
import { UserContext } from "app/providers";

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

const LanguageContainer = styled.div`
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 1em;
  margin: 2em;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontContrast};
  padding: 2em;
  text-wrap: no-wrap;
  background: linear-gradient(
    135deg,
    rgb(117, 109, 240) 21%,
    rgb(242, 205, 197) 100%
  );
  height: 20vh;
  width: 100%;
  ${borderRadius.m};
`;

const LangTabs = styled.div`
  margin-top: 1em;
  padding: 0.5em;
`;
const { useBreakpoint } = Grid;

export const RedactLanguage: React.FC = () => {
  const [langInfo, setLangInfo] = useState<ILanguage>();
  const { id } = useParams();
    const { store } = useContext(UserContext);

  const [error, setError] = useState("");
  const [file, setFile] = useState<FormData>();
  useEffect(() => {
    const fetchLangData = async () => {
      try {
        
        const response = await languageService.getLanguage(id!);
        setLangInfo(response.data.lang);

        const fileResponse = await languageService.getFileLang(id!);
        setFile(fileResponse.data);

        let fileObject = JSON.parse(fileResponse.data);
         console.log(fileObject) 
        console.log(fileObject.choices[0].message.content) 
        store.setCurrentLang(response.data.lang);
        const parsedFile = JSON.parse(fileObject.choices[0].message.content)
       console.log('current file ' + parsedFile.rules.noun)
        store.setCurrentFile(parsedFile);


      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    fetchLangData();
  }, []);
  const screens = useBreakpoint();

  const isVertical = screens.lg || screens.xl || screens.xxl;

  const tabPosition = isVertical ? "left" : "top";
  const items = [
    {
      label: "Грамматика",
      children: <Grammar />,
      key: "1",
    },

    {
      label: "Словарь",
      children: <Dictionary />,
      key: "2",
    },
    {
      label: "Настройки",
      children: <LanguagePreferences />,
      key: "3",
    },
  ];
  return (
    <LanguageContainer>
      <TitleContainer>
        <Text height="s" size={"32px"}>
          {langInfo?.Title}
        </Text>
        <Space height="s"></Space>

        <Text height="s" size={"18px"}>
          {langInfo?.Description}
        </Text>
        <Text height="s" size={"12px"}>
          {error}
        </Text>
        <Text height="s" size={"16px"}></Text>
      </TitleContainer>
      <LangTabs>
        <Tabs tabPosition={tabPosition} items={items} />
      </LangTabs>
    </LanguageContainer>
  );
};
