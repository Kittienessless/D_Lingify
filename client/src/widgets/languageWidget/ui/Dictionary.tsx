import React, { useState, useEffect, useContext, useRef } from "react";

import { Table, Button, Input, Space, Modal, Form } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";
import { UserContext } from "app/providers";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { VocabularyItem } from "./Grammar";

type WordItem = {
  key: string;
  word: string;
  translate: string;
  stress?: string;
  property?: string;
  IPA?: string;
};

export const Dictionary: React.FC = () => {
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [vocabular, setVocabular] = useState<WordItem[]>([]);
  const [form] = Form.useForm();
  const [dictionaryWords, setDictionaryWords] = useState<any[]>([]);

  const [searchWord, setSearchWord] = useState("");
  const [searchTranslation, setSearchTranslation] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editWordData, setEditWordData] = useState<VocabularyItem | null>(null);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editTranslation, setEditTranslation] = useState("");

  const [data, setData] = useState<WordItem[]>([]);

  const [word, setword] = useState<string>("");
  const [translate, settranslate] = useState<string>("");
  const [stress, setstress] = useState<string>("");
  const [property, setproperty] = useState<string>("");
  const [IPA, setIPA] = useState<string>("");

  const [newWord, setNewWord] = useState<WordItem>({
    key: "",
    word: "",
    stress: "",
    translate: "",
    property: "",
    IPA: "",
  });

  // Обработчик начала редактирования
  const onEdit = (record: WordItem) => {
    setEditingKey(record.key);
    setEditWord(record.word!);
    setEditTranslation(record.translate);
  };

  // Отмена редактирования
  const handleCancel = () => {
    setEditingKey(null);
    setEditWord("");
    setEditTranslation("");
  };

  // Сохранение изменений
  const handleSave = (key: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, word: editWord, translate: editTranslation }
          : item
      )
    );
    handleCancel();
  };

  // Удаление слова
  const handleDeleteVocabular = (key: string) => {
    setData((prev) => prev.filter((item) => item.key !== key));
    if (editingKey === key) {
      handleCancel();
    }
  };

  // Добавление нового слова
  const handleAddWord = () => {
    if (word.trim().length < 1) return;
    const newItem: WordItem = {
      key: Date.now().toString(),
      word: word,
      translate: translate,
      stress: stress,
      property: property,
      IPA: IPA,
    };
    setData([...dictionaryWords, newItem]);
    setNewWord({
      key: "",
      word: "",
      stress: "",
      translate: "",
      property: "",
      IPA: "",
    });
  };

  const columns: ColumnsType<WordItem> = [
    {
      title: "Слово",
      dataIndex: "word",
      key: "word",
      sorter: (a, b) => a.word!.localeCompare(b.word!),
      render: (text, record) =>
        record.key === editingKey ? (
          <Input
            value={editWord}
            onChange={(e) => setEditWord(e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Перевод",
      dataIndex: "translate",
      key: "translate",
      sorter: (a, b) => a.translate.localeCompare(b.translate),
      render: (text, record) =>
        record.key === editingKey ? (
          <Input
            value={editTranslation}
            onChange={(e) => setEditTranslation(e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Свойства",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "IPA",
      dataIndex: "IPA",
      key: "IPA",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) =>
        record.key === editingKey ? (
          <Space>
            <Button type="primary" onClick={() => handleSave(record.key)}>
              Сохранить
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => onEdit(record)}>
              Редактировать
            </Button>
            <Button danger onClick={() => handleDeleteVocabular(record.key)}>
              Удалить
            </Button>
          </Space>
        ),
    },
  ];

  useEffect(() => {
    try {
       setDictionaryWords(store.currentFile.vocabular);
      } catch (e) {}
  }, [store.currentFile]);

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
          columns={columns}
          pagination={{ pageSize: 20 }}
        />

        <Space>
          <Input
            placeholder="Слово"
            value={word}
            onChange={(e) => setword(e.target.value)}
          />
          <Input
            placeholder="Перевод"
            value={translate}
            onChange={(e) => settranslate(e.target.value)}
          />
          <Input
            placeholder="Ударение"
            value={stress}
            onChange={(e) => setstress(e.target.value)}
          />
          <Input
            placeholder="Свойство"
            value={property}
            onChange={(e) => setproperty(e.target.value)}
          />
          <Input
            placeholder="IPA"
            value={IPA}
            onChange={(e) => setIPA(e.target.value)}
          />
          <Button type="primary" onClick={ handleAddWord}>
            Добавить слово
          </Button>
        </Space>
      </CardLang>
    </GrammarContainer>
  );
};
