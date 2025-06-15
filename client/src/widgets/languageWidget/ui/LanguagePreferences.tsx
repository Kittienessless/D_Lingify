import React, { useState, useEffect } from "react";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";
import styled from "styled-components";

const PrefLang = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  min-width: 20em;
  max-width: fit-content;
  height: 3em;
  padding: 0.6em;
  margin: 0.8em;
  ${borderRadius.m};
`;
export const LanguagePreferences: React.FC = () => {
  return (
    <div>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          Изменить название языка
        </Text>
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          Изменить описание языка
        </Text>
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          Изменить вид карточки языка 
        </Text>
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          Скачать язык
        </Text>
      </PrefLang>
      <PrefLang>
        <Text height="s" size={"12pt"}>
          Импортировать словарь
        </Text>
      </PrefLang>
       <PrefLang>
        <Text height="s" size={"12pt"}>
          Удалить язык
        </Text>
      </PrefLang>
    </div>
  );
};
