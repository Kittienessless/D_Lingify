import React, { useState, useEffect, useContext } from "react";

import { Table, Button, Input, Space, Modal } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";
import { UserContext } from "app/providers";

export const Dictionary: React.FC = () => {
  const [newWord, setNewWord] = useState<string>("");
  const { store } = useContext(UserContext);

  const [dictionaryWords, setDictionaryWords] = useState<any[]>([]);
  // Для словаря с пагинацией
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editWord, setEditWord] = useState<string>("");
  const [editTranslation, setEditTranslation] = useState<string>("");

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
        prevData.map((item) =>
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
      title: "Удалить слово?",
      content: "Вы уверены, что хотите удалить это слово из словаря?",
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        setDictionaryWords((prevData) =>
          prevData.filter((item) => item.key !== key)
        );
      },
    });
  };
  const columnsDictionary = [
    {
      title: "Слово",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Перевод",
      dataIndex: "translate",
      key: "translate",
    },
    {
      title: "Пример",
      dataIndex: "stress",
      key: "stress",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: any) =>
        record.key === editingKey ? (
          <Space>
            <Button type="primary" onClick={handleSave}>
              Сохранить
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => onEdit(record)}>
              Редактировать
            </Button>
            <Button danger onClick={() => onDelete(record.key)}>
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
