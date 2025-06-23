import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Space } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";
import { UserContext } from "app/providers";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import languageService from "shared/api/language/languageService";

type WordItem = {
  key: string;
  word: string;
  translate: string;
  stress?: string;
  property?: string;
  IPA?: string;
};

interface ILP {
  id: string | undefined;
}

export const Dictionary = ({ id }: ILP) => {
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [data, setData] = useState<WordItem[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editTranslation, setEditTranslation] = useState("");
  const [word, setWord] = useState<string>("");
  const [translate, setTranslate] = useState<string>("");
  const [stress, setStress] = useState<string>("");
  const [property, setProperty] = useState<string>("");
  const [IPA, setIPA] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Обработчик начала редактирования
  const onEdit = (record: WordItem) => {
    setEditingKey(record.key);
    setEditWord(record.word);
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
    setData((prev) => [...prev, newItem]);
    setWord("");
    setTranslate("");
    setStress("");
    setProperty("");
    setIPA("");
  };

  const columns: ColumnsType<WordItem> = [
    {
      title: t("dictionary.word"),
      dataIndex: "word",
      key: "word",
      sorter: (a, b) => a.word.localeCompare(b.word),
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
      title: t("dictionary.translate"),
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
      title: t("dictionary.property"),
      dataIndex: "property",
      key: "property",
    },
    {
      title: t("dictionary.IPA"),
      dataIndex: "IPA",
      key: "IPA",
    },
    {
      title: t("dictionary.actions"),
      key: "actions",
      render: (_, record) =>
        record.key === editingKey ? (
          <Space>
            <Button type="primary" onClick={() => handleSave(record.key)}>
              {t("dictionary.save")}
            </Button>
            <Button onClick={handleCancel}>{t("dictionary.cancel")}</Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => onEdit(record)}>
              {t("dictionary.edit")}
            </Button>
            <Button danger onClick={() => handleDeleteVocabular(record.key)}>
              {t("dictionary.delete")}
            </Button>
          </Space>
        ),
    },
  ];

  useEffect(() => {
    if (store.currentFile && store.currentFile.vocabular) {
      setData(store.currentFile.vocabular);
    }
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

  const handleSaveAllChangesVocabular = async () => {
    setIsLoading(true);
    try {
      const result = await languageService.SaveAllChangesVocabular(id!, data);
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GrammarContainer>
      <CardLang>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 20 }}
        />

        <Space>
          <Input
            placeholder={t("dictionary.word")}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Input
            placeholder={t("dictionary.translate")}
            value={translate}
            onChange={(e) => setTranslate(e.target.value)}
          />
          <Input
            placeholder={t("dictionary.stress")}
            value={stress}
            onChange={(e) => setStress(e.target.value)}
          />
          <Input
            placeholder={t("dictionary.property")}
            value={property}
            onChange={(e) => setProperty(e.target.value)}
          />
          <Input
            placeholder={t("dictionary.IPA")}
            value={IPA}
            onChange={(e) => setIPA(e.target.value)}
          />
          <Button type="primary" onClick={handleAddWord}>
            {t("dictionary.addWord")}
          </Button>
        </Space>
      </CardLang>
      <div
        style={{
          marginTop: 16,
          gap: "8px",
          alignItems: "center",
          position: "fixed",
          bottom: "2em",
          right: "2em",
        }}
      >
        <Button
          size="large"
          type="primary"
          onClick={handleSaveAllChangesVocabular}
          loading={isLoading}
        >
          {isLoading ? t("dictionary.loading") : t("dictionary.saveAllChanges")}
        </Button>
      </div>
    </GrammarContainer>
  );
};
