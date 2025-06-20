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
const PrefLang = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  min-width: 20em;
  max-width: fit-content;
  height: 3em;
  padding: 0.6em;
  margin: 0.8em;
  display: flex;
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
export const LanguagePreferences: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

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
  async function handleUploaderFile(key: string) {}
  async function OnDelete(key: string) {
    await languageService.delete(key);
  }
  function handleEditTitle() {}
  function handleShowCards() {
    setIsOpen(!isOpen);
  }
  return (
    <div style={{display: 'flex'}}>
      <div>
      <PrefLang>
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
                    <InputContainer>
                      <input
                        value={title}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </InputContainer>
                    <Button onClick={handleEditTitle}>{t("LanguagePreferences.text15")}</Button>
                    <Button primary onClick={onClose}>
                      {t("LanguagePreferences.text6")}
                    </Button>
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
                      <input
                        value={desc}
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </InputContainer>
                    <Button onClick={handleEditTitle}>{t("LanguagePreferences.text15")}</Button>
                    <Button primary onClick={onClose}>
                      {t("LanguagePreferences.text16")}
                    </Button>
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
      </PrefLang>
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
          onClick={() => handleDownloadFile(store.currentLang.id)}
          title={t("LanguagePreferences.text5")}
          icon={<DownloadIcon />}
        />
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          {t("LanguagePreferences.text6")}
        </Text>
        <IconButton
          onClick={() => handleUploaderFile(store.currentLang.id)}
          title={t("LanguagePreferences.text6")}
          icon={<UploadIcon />}
        />
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          {t("LanguagePreferences.text7")}
        </Text>
        <IconButton
          onClick={() => OnDelete(store.currentLang.id)}
          title={t("LanguagePreferences.text7")}
          icon={<TrashBinIcon />}
        />
      </PrefLang>
      </div>
   {/*    {isOpen && <LangCards></LangCards>} */}
    </div>
  );
};
