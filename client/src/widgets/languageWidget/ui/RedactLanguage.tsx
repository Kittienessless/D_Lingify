import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table, Button, Input, Form, Descriptions } from "antd";
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
import { useTranslation } from "react-i18next";
import { IconButton } from "shared/ui/button/IconButton";
import { EditIcon } from "shared/assets/EditIcon";
import {
  CloseCircleOutlined,
  SaveFilled,
  SaveOutlined,
} from "@ant-design/icons";

const StyledInput = styled.input`
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  outline: none;
  width: 300px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

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
  background: ${({ theme }) => theme.gradients[1]};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontContrast};
  padding: 2.2em;
  text-wrap: no-wrap;
  height: fit-content;
  width: 100%;
  ${borderRadius.m};
  & svg {
    color: #fff !important;
  }
`;

const LangTabs = styled.div`
  margin-top: 1em;
  padding: 0.5em;
`;
const { useBreakpoint } = Grid;

export const RedactLanguage: React.FC = () => {
  const [langInfo, setLangInfo] = useState<ILanguage | undefined>();

  const { id } = useParams();
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [hasFetched, setHasFetched] = useState<boolean>(false); // чтобы фетчить один раз

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingF, setIsEditingF] = useState(false);
  const [error, setError] = useState("");
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [file, setFile] = useState<FormData>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (store.isAuth) {
      try {
        fetchLangData();
        setHasFetched(true);

        setIsEditing(false);
        setIsEditingF(false);
      } catch (e) {}
    }
  }, [store.currentLang ]);

  const screens = useBreakpoint();

  const isVertical = screens.lg || screens.xl || screens.xxl;

  const fetchLangData = async () => {
    try {
      const response = await languageService.getLanguage(id!);

      setLangInfo(response.data.lang);
      setTitle(response.data.lang.Title);
      setDesc(response.data.lang.Description);
      const fileResponse = await languageService.getFileLang(id!);
      setFile(fileResponse.data);

      let fileObject = JSON.parse(fileResponse.data);

      const parsedFile = JSON.parse(fileObject.choices[0].message.content);

      store.setCurrentFile(parsedFile);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const tabPosition = isVertical ? "left" : "top";
  const items = [
    {
      label: t("RedactLanguage.text1"),
      children: <Grammar />,
      key: "1",
    },

    {
      label: t("RedactLanguage.text2"),
      children: <Dictionary />,
      key: "2",
    },
    {
      label: t("RedactLanguage.text3"),
      children: <LanguagePreferences id={id} />,
      key: "3",
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    
  };
  const handleEditF = () => {
    setIsEditingF(true);
    
  };
  const handleCancel = () => {
    setIsEditing(false);
   };
  const handleCancelF = () => {
    setIsEditingF(false);
   };
  const handleSave = async (title: string) => {
    try {
      const res = await languageService.changeTitle(id!, title);
      store.setCurrentLang(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLangInfo(store.currentLang!);
      setTitle(store.currentLang!.Title);
      setIsEditing(false);
    }
  };
  const handleSaveFN = async (desc: string) => {
    const res = await languageService.changeDesc(id!, desc);
    store.setCurrentLang(res.data);
    setDesc(store.currentLang!.Description);
    setIsEditingF(false);
  };
  return (
    <LanguageContainer>
      <TitleContainer>
        {!isEditing ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
              maxWidth: "25em",
            }}
          >
            <div>
              <Text height="s" size={"32px"}>
                {langInfo?.Title}
              </Text>
            </div>
            <IconButton
              title={t("buttons.save")}
              icon={<EditIcon />}
              onClick={handleEdit}
            />
          </div>
        ) : (
          <>
            <Form form={form} layout="vertical" style={{ marginTop: "8px" }}>
              <Form.Item
                name="Title"
                rules={[
                  {
                    required: true,
                    message: t("profile.hintLatinLetters"),
                  },
                ]}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "8px",
                    maxWidth: "30em",
                  }}
                >
                  <StyledInput
                    value={Title}
                    name="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />{" "}
                  <IconButton
                    icon={<SaveOutlined />}
                    title={t("buttons.save")}
                    onClick={() => handleSave(Title)}
                  />
                  <IconButton
                    icon={<CloseCircleOutlined />}
                    title={t("buttons.save")}
                    onClick={handleCancel}
                  />
                </div>
              </Form.Item>
            </Form>
          </>
        )}

        <Space height="s"></Space>

        {!isEditingF ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
              maxWidth: "25em",
            }}
          >
            <div>
              <Text height="s" size={"18px"}>
                {langInfo?.Description}
              </Text>
            </div>
            <IconButton
              title={t("buttons.save")}
              icon={<EditIcon />}
              onClick={handleEditF}
            />
          </div>
        ) : (
          <>
            <Form form={form} layout="vertical" style={{ marginTop: "8px" }}>
              <Form.Item
                name="Description"
                rules={[
                  {
                    required: true,
                    message: t("profile.hintLatinLetters"),
                  },
                ]}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "8px",
                    maxWidth: "30em",
                  }}
                >
                  <StyledInput
                    value={Desc}
                    name={"Description"}
                    onChange={(e) => setDesc(e.target.value)}
                  />{" "}
                  <IconButton
                    icon={<SaveOutlined />}
                    title={t("buttons.save")}
                    onClick={() => handleSaveFN(Desc)}
                  />
                  <IconButton
                    icon={<CloseCircleOutlined />}
                    title={t("buttons.save")}
                    onClick={handleCancelF}
                  />
                </div>
              </Form.Item>
            </Form>
          </>
        )}
        <div style={{marginTop: '1em'}}>
        <Text height="s" size={"14px"}>
          {error}
        </Text>
        </div>
        <Text height="s" size={"16px"}></Text>
      </TitleContainer>

      <LangTabs>
        <Tabs tabPosition={tabPosition} items={items} />
      </LangTabs>
    </LanguageContainer>
  );
};
