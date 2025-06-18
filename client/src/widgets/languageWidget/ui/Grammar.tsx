import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import styled from "styled-components";
import Card from "antd/es/card/Card";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";
import { UserContext } from "app/providers";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      title: t("Grammar.text1"),
      content:  t("Grammar.text2"),
      okText:  t("Grammar.text3"),
      cancelText:  t("Grammar.text4"),
      onOk() {
        setNounRules((prevData) => prevData.filter((item) => item.key !== key));
      },
    });
  };
  return (
    <GrammarContainer>
      <CardLang>
        <Text height="s" size={"12pt"}>
          { t("Grammar.text5")}
        </Text>
        <Table
          dataSource={nounRules}
          columns={[
            { title: t("Grammar.text6"), dataIndex: "rule", key: "key" },
            {
              title:  t("Grammar.text7"),
              key: "actions",
              render: (_, record) =>
                record.key === editingKey ? (
                  <Space>
                    <Button type="primary" onClick={handleSave}>
                      {t("Grammar.text8")}
                    </Button>
                    <Button onClick={handleCancel}>{t("Grammar.text9")}</Button>
                  </Space>
                ) : (
                  <Space>
                    <Button type="link" onClick={() => onEdit(record)}>
                      {t("Grammar.text10")}
                    </Button>
                    <Button danger onClick={() => onDelete(record.key)}>
                      {t("Grammar.text11")}
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
 {t("Grammar.text12")}
        <Table
          dataSource={verbRules}
          columns={[
            { title: t("Grammar.text6"), dataIndex: "rule", key: "key" },
            {
              title:  t("Grammar.text7"),
              key: "actions",
              render: (_, record) =>
                record.key === editingKey ? (
                  <Space>
                    <Button type="primary" onClick={handleSave}>
                      {t("Grammar.text8")}
                    </Button>
                    <Button onClick={handleCancel}>{t("Grammar.text9")}</Button>
                  </Space>
                ) : (
                  <Space>
                    <Button type="link" onClick={() => onEdit(record)}>
                      {t("Grammar.text10")}
                    </Button>
                    <Button danger onClick={() => onDelete(record.key)}>
                      {t("Grammar.text11")}
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
           {t("Grammar.text13")}
        </Text>

        <Table
          dataSource={pronounRules}
          columns={[
            { title: t("Grammar.text6"), dataIndex: "rule", key: "key" },
            {
              title:  t("Grammar.text7"),
              key: "actions",
              render: (_, record) =>
                record.key === editingKey ? (
                  <Space>
                    <Button type="primary" onClick={handleSave}>
                      {t("Grammar.text8")}
                    </Button>
                    <Button onClick={handleCancel}>{t("Grammar.text9")}</Button>
                  </Space>
                ) : (
                  <Space>
                    <Button type="link" onClick={() => onEdit(record)}>
                      {t("Grammar.text10")}
                    </Button>
                    <Button danger onClick={() => onDelete(record.key)}>
                      {t("Grammar.text11")}
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
           {t("Grammar.text14")}
        </Text>

        <Table
          dataSource={adjectiveRules}
         columns={[
            { title: t("Grammar.text6"), dataIndex: "rule", key: "key" },
            {
              title:  t("Grammar.text7"),
              key: "actions",
              render: (_, record) =>
                record.key === editingKey ? (
                  <Space>
                    <Button type="primary" onClick={handleSave}>
                      {t("Grammar.text8")}
                    </Button>
                    <Button onClick={handleCancel}>{t("Grammar.text9")}</Button>
                  </Space>
                ) : (
                  <Space>
                    <Button type="link" onClick={() => onEdit(record)}>
                      {t("Grammar.text10")}
                    </Button>
                    <Button danger onClick={() => onDelete(record.key)}>
                      {t("Grammar.text11")}
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
          {t("Grammar.text15")}
        </Text>

        <Table
          dataSource={adverbRules}
         columns={[
            { title: t("Grammar.text6"), dataIndex: "rule", key: "key" },
            {
              title:  t("Grammar.text7"),
              key: "actions",
              render: (_, record) =>
                record.key === editingKey ? (
                  <Space>
                    <Button type="primary" onClick={handleSave}>
                      {t("Grammar.text8")}
                    </Button>
                    <Button onClick={handleCancel}>{t("Grammar.text9")}</Button>
                  </Space>
                ) : (
                  <Space>
                    <Button type="link" onClick={() => onEdit(record)}>
                      {t("Grammar.text10")}
                    </Button>
                    <Button danger onClick={() => onDelete(record.key)}>
                      {t("Grammar.text11")}
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
