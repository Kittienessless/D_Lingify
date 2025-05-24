import { TextArea } from "shared/ui/textArea";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import styled from "styled-components";
import useTranslate from "../../../shared/lib/hook/useTranslate";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { ILanguage } from "entities/language/index.ts";
import { UserContext } from "app/providers/index.tsx";
import { FundTwoTone } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const options: Option[] = [
  {
    id: '1',
    label: "Английский",
    value: "English",
  },
  {
    id: '2',
    label: "Русский",
    value: "Russian",
  },
];
const Translate = () => {
  const [sourceText, setSourceText] = useState("");
  const [langs, setLangs] = useState<Option[]>([]);

  const [accessibleLang, setAccessibleLang] = useState<Option | null>(null);
  const [selectedLang, setSelectedLang] = useState<Option | null>(null);

  const targetText = useTranslate(sourceText, selectedLang!.value);
  const { store } = useContext(UserContext);

  useEffect(() => {
    setLangs(store.languageTextArray)

    
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
          placeholder="Выберите язык..."
          selected={accessibleLang}
          options={options}
          onChange={(selection: Option) => setAccessibleLang(selection)}
        />
        <TextArea
          id={1}
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Пишите текст здесь..."
          maxlength={1000}
        />
      </ContainerTranslate>

      <ContainerTranslate>
        <Select
          placeholder="Выберите язык"
          selected={selectedLang}
          options={langs}
          onChange={(selection: Option) => setSelectedLang(selection)}
        />
        <TextArea
          id={2}
          placeholder="Перевод..."
          value={targetText}
          maxlength={1000}
        />
      </ContainerTranslate>
    </TranslateCont>
  );
};
export default observer(Translate)