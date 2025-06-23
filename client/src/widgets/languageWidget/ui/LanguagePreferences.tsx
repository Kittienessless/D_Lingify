import React, { useState, useEffect, useContext } from "react";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";
import styled from "styled-components";

import { Button } from "shared/ui/button/index.tsx";
import { IconButton } from "shared/ui/button/IconButton";
import { Modal } from "shared/ui/modal";
import { Opener } from "../../../shared/lib/Opener.tsx";
import { HStack, VStack } from "../../../shared/lib/stack.tsx";
import { EditIcon } from "shared/assets/EditIcon";
import { InputContainer } from "shared/lib/InputContainer";
import { SaveLang } from "features/languageCard/ui/SaveLang.tsx";
import { UserContext } from "app/providers/index.tsx";
import languageService from "shared/api/language/languageService.ts";
import { DownloadIcon } from "shared/assets/DownloadIcon.tsx";
import Upload from "antd/es/upload/Upload";
import { TrashBinIcon } from "shared/assets/TrashBinIcon.tsx";
import { Uploader } from "features/languageCard/index.ts";
import { UploadIcon } from "shared/assets/UploadIcon.tsx";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { WithHint } from "shared/ui/tooltip/WithHint.tsx";
import { Form, Input } from "antd";
const PrefLang = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  min-width: 20em;
  max-width: fit-content;
  height: fit-content;
  padding: 0.6em;
  margin: 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${borderRadius.m};
`;

const LangCards = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  min-width: 50em;
  height: 22em;
  padding: 1em;
  ${borderRadius.m};

  margin: 1em;
`;
interface ILP {
  id: string | undefined;
}
export const LanguagePreferences = ({ id }: ILP) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  async function handleDownloadFile(key: string) {
    try {
      const formData = new FormData();
      const response = await languageService.download(key);
      const a = document.createElement("a");

      a.style.display = "none";
      document.body.appendChild(a);

      formData.append("file", JSON.stringify(response.data));
      const blobFile = new Blob([JSON.stringify(response.data)], {
        type: "text/plain",
      });
      const url = window.URL.createObjectURL(blobFile);
      a.href = url;
      a.download = "Language " + title;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.log(e);
    }
  }
   
  async function OnDelete(key: string) {
    await languageService.delete(key);
  }
  const handleEditTitle = async (title: string) => {
    const res = await languageService.changeTitle(id!, title);
    store.setCurrentLang(res.data);
    setTitle(store.currentLang!.Title);
  };
  const handleEditDesc = async (desc: string) => {
    const res = await languageService.changeDesc(id!, desc);
    store.setCurrentLang(res.data);
    setDesc(store.currentLang!.Description);
  };

  function handleShowCards() {
    setIsOpen(!isOpen);
  }
 
  return (
    <div style={{ display: "flex" }}>
      <div>
      {/*   <PrefLang>
          <Text height="s" size={"12pt"}>
            {t("LanguagePreferences.text1")}
          </Text>
          <HStack gap={40}>
            <Opener
              renderOpener={({ onOpen }) => (
                <IconButton
                  icon={<EditIcon />}
                  title={t("LanguagePreferences.text12")}
                  onClick={onOpen}
                >
                  {t("LanguagePreferences.text13")}
                </IconButton>
              )}
              renderContent={({ onClose }) => (
                <Modal
                  title={t("LanguagePreferences.text14")}
                  onClose={onClose}
                  width={400}
                  footer={
                    <div>
                      <Form>
                        <Form.Item
                          label={t("NeuralLangInput.title14")}
                          name="latinLetters1"
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Input
                              style={{ width: "40px", minWidth: "50px" }}
                              value={title}
                              placeholder={t("NeuralLangInput.title16")}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <WithHint
                              hint={t("NeuralLangInput.hintLatinLetters")}
                            >
                              <></>
                            </WithHint>
                          </div>
                        </Form.Item>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            primary
                            onClick={() => handleEditTitle(title)}
                          >
                            {t("LanguagePreferences.text15")}
                          </Button>
                          <Button primary onClick={onClose}>
                            {t("LanguagePreferences.text16")}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  }
                >
                  <VStack gap={20}>
                    <Text>{t("LanguagePreferences.text16")}</Text>
                  </VStack>
                </Modal>
              )}
            />
          </HStack>
        </PrefLang>
        <PrefLang>
          <Text height="s" size={"12pt"}>
            {t("LanguagePreferences.text2")}
          </Text>
          <HStack gap={40}>
            <Opener
              renderOpener={({ onOpen }) => (
                <IconButton
                  icon={<EditIcon />}
                  title={t("LanguagePreferences.text21")}
                  onClick={onOpen}
                >
                  {t("LanguagePreferences.text21")}
                </IconButton>
              )}
              renderContent={({ onClose }) => (
                <Modal
                  title={t("LanguagePreferences.text14")}
                  onClose={onClose}
                  width={400}
                  footer={
                    <div>
                      <InputContainer>
                        <Form>
                          <Form.Item
                            label={t("NeuralLangInput1.title14")}
                            name="latinLetters"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Input
                                style={{ width: "40px", minWidth: "50px" }}
                                value={desc}
                                placeholder={t("NeuralLangInput1.title16")}
                                onChange={(e) => setDesc(e.target.value)}
                              />
                              <WithHint
                                hint={t("NeuralLangInput1.hintLatinLetters")}
                              >
                                <></>
                              </WithHint>
                            </div>
                          </Form.Item>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              primary
                              onClick={() => handleEditDesc(desc)}
                            >
                              {t("LanguagePreferences.text15")}
                            </Button>
                            <Button primary onClick={onClose}>
                              {t("LanguagePreferences.text16")}
                            </Button>
                          </div>
                        </Form>
                      </InputContainer>
                    </div>
                  }
                >
                  <VStack gap={20}>
                    <Text>{t("LanguagePreferences.text22")}</Text>
                  </VStack>
                </Modal>
              )}
            />
          </HStack>
        </PrefLang> */}
        {/* <PrefLang>
        <Text height="s" size={"12pt"}>
         {t("LanguagePreferences.text3")}
        </Text>
        <IconButton
          onClick={() => handleShowCards()}
          title={t("LanguagePreferences.text4")}
          icon={isOpen ? <ArrowLeftOutlined /> :  <ArrowRightOutlined /> }
        />
      </PrefLang> */}
        <PrefLang>
          <Text height="s" size={"12pt"}>
            {t("LanguagePreferences.text5")}
          </Text>
          <IconButton
            onClick={() => handleDownloadFile(id!)}
            title={t("LanguagePreferences.text5")}
            icon={<DownloadIcon />}
          />
        </PrefLang>
     
        <PrefLang>
          <Text height="s" size={"12pt"}>
            {t("LanguagePreferences.text7")}
          </Text>
          <IconButton
            onClick={() => OnDelete(id!)}
            title={t("LanguagePreferences.text7")}
            icon={<TrashBinIcon />}
          />
        </PrefLang>
        <PrefLang>
          <Uploader id={id}></Uploader>
        </PrefLang>
      </div>
      {/*    {isOpen && <LangCards></LangCards>} */}
    </div>
  );
};
