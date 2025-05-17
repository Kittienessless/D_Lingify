import { TextArea } from "shared/ui/textArea";
import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import useTranslate from "../../../shared/lib/hook/useTranslate";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
 
const options: Option[] = [
  {
    label: "Английский",
    value: "English",
  },
  {
    label: "Русский",
    value: "Russian",
  },
];

export const Translate = () => {
  const [sourceText, setSourceText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const targetText = useTranslate(sourceText, selectedLanguage);
  const [acessibleLang, setAcessibleLang] = useState<Option | null>(null);
  const [selectedLang, setSelectedLang] = useState<Option | null>(null);

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
          selected={acessibleLang}
          options={options}
          onChange={(selection: Option) => setAcessibleLang(selection)}
        />
        <TextArea
          id={1}
          value={sourceText}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setSourceText(e.target.value)
          }
          placeholder="Пишите текст здесь..."
          maxlength={1000}
        />
      </ContainerTranslate>

      <ContainerTranslate>
        <Select    
          placeholder="Выберите язык"
          selected={selectedLang}
          options={options}
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
