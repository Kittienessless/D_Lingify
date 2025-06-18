import React, { useState, useEffect, useContext } from "react";

import { Table, Button, Input, Space, Modal } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";
import { UserContext } from "app/providers";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

export const Dictionary: React.FC = () => {
  const [newWord, setNewWord] = useState<string>("");
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  const [dictionaryWords, setDictionaryWords] = useState<any[] | null>([]);
  // Для словаря с пагинацией
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editWord, setEditWord] = useState<string>("");
  const [editTranslation, setEditTranslation] = useState<string>("");
  // Поля поиска
  const [searchWord, setSearchWord] = useState("");
  const [searchTranslation, setSearchTranslation] = useState("");

  // Фильтрованные данные
  const filteredData = dictionaryWords?.filter(
    (item?) =>
      item?.word.toLowerCase().includes(searchWord?.toLowerCase()) &&
      item?.translate.toLowerCase().includes(searchTranslation?.toLowerCase())
      
  );
  // Функция для начала редактирования
  const onEdit = (record: any) => {
    setEditingKey(record.key);
    setEditWord(record.word);
    setEditTranslation(record.translation);
  };

  // Функция для сохранения изменений
  const handleSave = () => {
    if (editingKey) {
      setDictionaryWords((prevData) =>
        prevData!.map((item) =>
          item.key === editingKey
            ? { ...item, word: editWord, translation: editTranslation }
            : item
        )
      );
      setEditingKey(null);
    }
  };

  // Функция для отмены редактирования
  const handleCancel = () => {
    setEditingKey(null);
  };

  // Функция удаления строки
  const onDelete = (key: string) => {
    Modal.confirm({
      title: t("Dictionary.text1"),
      content: t("Dictionary.text2"),
      okText: t("Dictionary.text3"),
      cancelText: t("Dictionary.text4"),
      onOk() {
        setDictionaryWords((prevData) =>
          prevData!.filter((item) => item.key !== key)
        );
      },
    });
  };
  // Определение колонок с сортировкой и действиями
  const columns: ColumnsType<any> = [
    {
      title: t("Dictionary.text5"),
      dataIndex: "word",
      key: "word",
      sorter: (a: any, b: any) => a.word.localeCompare(b.word),
      render: (text: any, record: any) =>
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
      title: t("Dictionary.text6"),
      dataIndex: "translate",
      key: "translate",
      sorter: (a: any, b: any) => a.translate.localeCompare(b.translate),
      render: (text: any, record: any) =>
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
      title: t("Dictionary.text7"),
      key: "actions",
      render: (_: any, record: any) =>
        record.key === editingKey ? (
          <Space>
            <Button onClick={handleSave}>{t("Dictionary.text8")}</Button>
            <Button onClick={handleCancel}>{t("Dictionary.text9")}</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => onEdit(record)}>{t("Dictionary.text10")}</Button>
            <Button danger onClick={() => onDelete(record.key)}>
              {t("Dictionary.text11")}
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
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder={t("Dictionary.text12")}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Input
            placeholder={t("Dictionary.text13")}
            value={searchTranslation}
            onChange={(e) => setSearchTranslation(e.target.value)}
          />
        </Space>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 20 }}
        />
      </CardLang>
    </GrammarContainer>
  );
};
