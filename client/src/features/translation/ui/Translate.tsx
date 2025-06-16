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

const options: Option[] = [
  {
    id: "1",
    label: "Английский",
    value: "English",
  },
  {
    id: "2",
    label: "Русский",
    value: "Russian",
  },
];
const Translate = () => {
  const [sourceText, setSourceText] = useState("");
  const [langs, setLangs] = useState<Option[]>();

  const [accessibleLang, setAccessibleLang] = useState<Option | null>();
  const [selectedLang, setSelectedLang] = useState<Option>();

  const targetText = useTranslate(sourceText, selectedLang!);
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  const fetchTitleData = async () => {
    try {
      await store.getAllLangsTitle();
      await setLangs(store.languageTextArray);
      console.log(langs);
    } catch (e) {
      console.log(e);
    }
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
          value={targetText}
          maxlength={1000}
        />
      </ContainerTranslate>
    </TranslateCont>
  );
};
export default observer(Translate);
