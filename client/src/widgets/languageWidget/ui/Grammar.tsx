import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import styled from "styled-components";
import Card from "antd/es/card/Card";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";
import { UserContext } from "app/providers";
import { useTranslation } from "react-i18next";
import languageService from "shared/api/language/languageService";
import { useParams } from "react-router-dom";

export interface VocabularyItem {
  key: string;
  word: string;
  translate: string;
  stress: string;
  property: string;
  IPA: string;
}

export interface Rules {
  noun?: { rule: string }[];
  verb?: { rule: string }[];
  pronoun?: { rule: string }[];
  adjective?: { rule: string }[];
  adverb?: { rule: string }[];
  conjunction?: { rule: string }[];
  interjection?: { rule: string }[];
}

export interface AdditionalRules {
  articles?: { rule: string }[];
  nounGender?: { rule: string }[];
  DegreesofComparison?: { rule: string }[];
}

export interface LanguageInterface {
  Title: string;
  Desc: string;
  vocabular: VocabularyItem[];
  rules: Rules & AdditionalRules; // объединение правил
}

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
  const { id } = useParams();

  const { t } = useTranslation();
  const [nounRules, setNounRules] = useState<any[]>([]);
  const [verbRules, setVerbRules] = useState<any[]>([]);
  const [pronounRules, setPronounRules] = useState<any[]>([]);
  const [adjectiveRules, setAdjectiveRules] = useState<any[]>([]);
  const [adverbRules, setAdverbRules] = useState<any[]>([]);
  // редактируемая строка
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    try {
      setNounRules(store.currentFile.rules.noun);
      setVerbRules(store.currentFile.rules.verb);
      setPronounRules(store.currentFile.rules.pronoun);
      setAdjectiveRules(store.currentFile.rules.adjective);
      setAdverbRules(store.currentFile.rules.adverb);
    } catch (e) {}
  }, [store.currentFile]);

  // Обработчик для начала редактирования
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(nounRules[index].rule);
  };

  // Обработчик отмены редактирования
  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  // Обработчик сохранения изменений
  const handleSave = (index: number) => {
    const updatedRules = [...nounRules];
    updatedRules[index] = { ...updatedRules[index], rule: editValue };
    setNounRules(updatedRules);
    handleCancel(); // сброс режима редактирования
  };

  // Обработчик удаления правила
  const handleDeleteRule = (index: number) => {
    const updatedRules = [...nounRules];
    updatedRules.splice(index, 1);
    setNounRules(updatedRules);
    if (index === editingIndex) {
      handleCancel();
    }
  };

  // Для добавления новых правил
  const [newRule, setNewRule] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const handleAddRule = () => {
    if (newRule.trim().length < 2) return;
    setAdding(true);
    const newItem = {
      key: `noun-${nounRules.length}`,
      rule: newRule,
    };
    setNounRules([...nounRules, newItem]);
    setNewRule("");
    setAdding(false);
  };

  const handleSaveAllChanges_rules = async () => {
    try {
      const rulesData = {
        rules: {
          noun: nounRules,
          verb: verbRules,
          pronoun: pronounRules,
          adjective: adjectiveRules,
          adverb: adverbRules,
        },
      };
    const result =  await languageService.SaveAllChangesRules(id!, rulesData);
      console.log(result)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GrammarContainer>
      <CardLang> 
         <Table
        dataSource={nounRules}
        columns={[
          {
            title: "Правило",
            dataIndex: "rule",
            key: "rule",
            render: (_text, record, index) =>
              editingIndex === index ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                record.rule
              ),
          },
          {
            title: "Действия",
            key: "actions",
            render: (_text, record, index) => {
              if (editingIndex === index) {
                return (
                  <>
                    <Button
                      type="link"
                      onClick={() => handleSave(index)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
                      type="link"
                      onClick={() => handleEdit(index)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button danger onClick={() => handleDeleteRule(index)}>
                      Delete
                    </Button>
                  </>
                );
              }
            },
          },
        ]}
        pagination={false}
      />

      {/* Форма добавления */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Введите новое правило"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          minLength={2}
          maxLength={100}
        />
        <Button type="primary" onClick={handleAddRule} disabled={adding}>
          {adding ? "Загрузка..." : "Добавить"}
        </Button>
      </div>
      </CardLang>
       <CardLang> 
         <Table
        dataSource={verbRules}
        columns={[
          {
            title: "Правило",
            dataIndex: "rule",
            key: "rule",
            render: (_text, record, index) =>
              editingIndex === index ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                record.rule
              ),
          },
          {
            title: "Действия",
            key: "actions",
            render: (_text, record, index) => {
              if (editingIndex === index) {
                return (
                  <>
                    <Button
                      type="link"
                      onClick={() => handleSave(index)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
                      type="link"
                      onClick={() => handleEdit(index)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button danger onClick={() => handleDeleteRule(index)}>
                      Delete
                    </Button>
                  </>
                );
              }
            },
          },
        ]}
        pagination={false}
      />

      {/* Форма добавления */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Введите новое правило"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          minLength={2}
          maxLength={100}
        />
        <Button type="primary" onClick={handleAddRule} disabled={adding}>
          {adding ? "Загрузка..." : "Добавить"}
        </Button>
      </div>
      </CardLang>
      <Button
        type="primary"
        onClick={handleSaveAllChanges_rules}
        disabled={adding}
      >
        {adding ? "Добавление..." : "Добавить"}
      </Button> 


    </GrammarContainer>
  );
};
