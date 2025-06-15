import React, { useState, useEffect } from "react";

import { Table, Button, Input, Space } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";

interface DictionaryWord {
  key: string;
  word: string;
  translation: string;
  example: string;
}
export const Dictionary: React.FC = () => {
  const [newWord, setNewWord] = useState<string>("");

  const [dictionaryWords, setDictionaryWords] = useState<DictionaryWord[]>([
    { key: "1", word: "Apple", translation: "Яблоко", example: "I like Apple" },
    // ...больше слов для пагинации
  ]);
  // Для словаря с пагинацией
  const columnsDictionary = [
    {
      title: "Слово",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Перевод",
      dataIndex: "translation",
      key: "translation",
    },
    {
      title: "Пример",
      dataIndex: "example",
      key: "example",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_text: any, record: any) => (
        <p>
          <Button>Edit </Button>
          <Button danger>Delete </Button>
        </p>
      ),
    },
  ];
  const CardLang = styled.div`
    background-color: ${({ theme }) => theme.colors.container};
    color: ${({ theme }) => theme.colors.font};
    padding: 1em;
    margin: 1em;
    ${borderRadius.m};
  `;
  const GrammarContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.bg};
    padding-left: 1em;
  `;
  return (
    <GrammarContainer>
      <CardLang>
        <Table
          dataSource={dictionaryWords}
          columns={columnsDictionary}
          pagination={{ pageSize: 20 }}
          footer={() => (
            <Input
              placeholder="Добавить слово"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onPressEnter={() => {
                if (newWord.trim()) {
                  const newEntry = {
                    key: String(Date.now()),
                    word: newWord,
                    translation: "",
                    example: "",
                  };
                  setDictionaryWords([...dictionaryWords, newEntry]);
                  setNewWord("");
                }
              }}
            />
          )}
        />
      </CardLang>
    </GrammarContainer>
  );
};
