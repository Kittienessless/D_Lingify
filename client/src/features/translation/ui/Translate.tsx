import { TextArea } from "shared/ui/textArea";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { UserContext } from "app/providers/index.tsx";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button/index.tsx";
import featureService from "shared/api/features/featureService.ts";
import { Text } from "shared/ui/text/index.tsx";
import { Loader } from "shared/ui/loaders";

const Translate = () => {
  const [sourceText, setSourceText] = useState("");
  const [langs, setLangs] = useState<Option[]>([]);
  const [accessibleLang, setAccessibleLang] = useState<Option | null>(null);
  const [selectedLang, setSelectedLang] = useState<Option | null>(null);
  const [targetText1, setTargetText1] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  const options: Option[] = [
    {
      id: "1",
      label: t("translator.text1"),
      value: "English",
    },
    {
      id: "2",
      label: t("translator.text2"),
      value: "Russian",
    },
  ];

  const fetchTitleData = async () => {
    try {
      await store.getAllLangsTitle();
      setLangs(store.languageTextArray);
    } catch (e) {
      console.log(e);
    }
  };

  const OnTranslateHelper = async () => {
    if (!sourceText || !selectedLang) return;

    setIsTranslating(true);
    setTargetText1("");

    try {
      const res = await featureService.translate(sourceText, selectedLang.id);
      const fileObject = JSON.parse(res.data);
      const parsedFile = JSON.stringify(fileObject.choices[0].message.content);
      setTargetText1(parsedFile);
    } catch (e) {
      console.error(e);
      setTargetText1(t("translator.error"));
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    fetchTitleData();
  }, []);

  const TranslateCont = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    
    @media (max-width: 1000px) {
      flex-direction: column;
    }
  `;

  const ContainerTranslate = styled.div`
    flex: 1;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const isButtonDisabled = !sourceText || !accessibleLang || !selectedLang || isTranslating;

  return (
    <>
      <TranslateCont>
        <ContainerTranslate>
          <Select
            placeholder={t("profile.Translate1")}
            selected={accessibleLang}
            options={options}
            onChange={(selection: Option) => setAccessibleLang(selection)}
          />
          <TextArea
            id={1}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={t("profile.Translate2")}
            maxlength={1000}
          />
        </ContainerTranslate>

        <ContainerTranslate>
          <Select
            placeholder={t("profile.Translate1")}
            selected={selectedLang}
            options={langs}
            onChange={(selection: Option) => setSelectedLang(selection)}
          />
          <TextArea
            id={2} readonly
            placeholder={isTranslating ? t("translator.processing") : t("profile.Translate3")}
            value={targetText1}
            maxlength={2000}
           
          />
        </ContainerTranslate>
      </TranslateCont>

      <ButtonContainer>
        <Button 
          primary 
          onClick={OnTranslateHelper} 
          disabled={isButtonDisabled}
        >
          {t("profile.Translate4")}
        </Button>
        {isTranslating && <Loader   />}
      </ButtonContainer>
    </>
  );
};

export default observer(Translate);
