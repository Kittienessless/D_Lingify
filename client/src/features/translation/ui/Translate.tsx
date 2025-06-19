import { TextArea } from "shared/ui/textArea";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import useTranslate from "../../../shared/lib/hook/useTranslate";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { ILanguage } from "entities/language/index.ts";
import { UserContext } from "app/providers/index.tsx";
import { FundTwoTone } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button/index.tsx";
import featureService from "shared/api/features/featureService.ts";
import { Text } from "shared/ui/text/index.tsx";
const Translate = () => {
  const [sourceText, setSourceText] = useState("");
  const [langs, setLangs] = useState<Option[]>();

  const [accessibleLang, setAccessibleLang] = useState<Option | null>();
  const [selectedLang, setSelectedLang] = useState<Option>();

  //const targetText = useTranslate(sourceText, selectedLang!);
  const [targetText1, setTargetText1] = useState("");
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
      await setLangs(store.languageTextArray);
      console.log(langs);
    } catch (e) {
      console.log(e);
    }
  };
  const OnTranslateHelper = async () => {
    try {
      const res = await featureService.translate(sourceText, selectedLang!.id);
      console.log(res)
      let fileObject = JSON.parse(res.data);
      console.log(res.data);
      const parsedFile = JSON.stringify(fileObject.choices[0].message.content);
      console.log(parsedFile);

      setTargetText1(parsedFile);
    } catch (e) {}
  };
  useEffect(() => {
    fetchTitleData();
  }, []);

  const TranslateCont = styled.div`
    display: flex;
  `;

  const ContainerTranslate = styled.div`
    display: block;
  `;

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
            options={langs!}
            onChange={(selection: Option) => setSelectedLang(selection)}
          />
           <TextArea
            id={2}
            placeholder={t("profile.Translate3")}
            value={targetText1}
            maxlength={2000}
          />
        </ContainerTranslate>
      </TranslateCont>
      <Button primary onClick={OnTranslateHelper}>
        {t("profile.Translate4")}
      </Button>
    </>
  );
};
export default observer(Translate);
