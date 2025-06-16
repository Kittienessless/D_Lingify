import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import styled from "styled-components";
import Card from "antd/es/card/Card";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";
import { UserContext } from "app/providers";

const GrammarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100vw;
  display: grid;
  grid-template-columns: 60em 60em;
  column-gap: 1em;
  @media (width <= 1350px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;
const CardLang = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin: 0.6em;
  @media (width <= 1750px) {
    width: 80%;
  }

  ${borderRadius.m};
`;

export const Grammar: React.FC = () => {
  const { store } = useContext(UserContext);

  const [nounRules, setNounRules] = useState<any[]>([]);

  const [verbRules, setVerbRules] = useState<any[]>([]);
  const [pronounRules, setPronounRules] = useState<any[]>([]);
  const [adjectiveRules, setAdjectiveRules] = useState<any[]>([]);
  const [adverbRules, setAdverbRules] = useState<any[]>([]);
  useEffect(() => {
    try {
      setNounRules(store.currentFile.rules.noun);
      setVerbRules(store.currentFile.rules.verb);
      setPronounRules(store.currentFile.rules.pronoun);
      setAdjectiveRules(store.currentFile.rules.adjective);
      setAdverbRules(store.currentFile.rules.adverb);
    } catch (e) {}
  }, [store.currentFile]);

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
      setNounRules((prevData) =>
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
        setNounRules((prevData) => prevData.filter((item) => item.key !== key));
      },
    });
  };
  return (
    <GrammarContainer>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Существительные
        </Text>
        <Table
          dataSource={nounRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "key" },
            {
              title: "Действия",
              key: "actions",
              render: (_, record) =>
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
          ]}
          pagination={false}
        />
      </CardLang>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Глаголы
        </Text>

        <Table
          dataSource={verbRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "rule" },
            {
              title: "Действия",
              key: "actions",
              render: (_, record) =>
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
          ]}
          pagination={false}
        />
      </CardLang>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Местоимения
        </Text>

        <Table
          dataSource={pronounRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "rule" },
            {
              title: "Действия",
              key: "actions",
              render: (_, record) =>
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
          ]}
          pagination={false}
        />
      </CardLang>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Прилагательные
        </Text>

        <Table
          dataSource={adjectiveRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "rule" },
            {
              title: "Действия",
              key: "actions",
              render: (_, record) =>
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
          ]}
          pagination={false}
        />
      </CardLang>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Наречия
        </Text>

        <Table
          dataSource={adverbRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "rule" },
            {
              title: "Действия",
              key: "actions",
              render: (_, record) =>
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
          ]}
          pagination={false}
        />
      </CardLang>
    </GrammarContainer>
  );
};
