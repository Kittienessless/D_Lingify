import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Space } from "antd";
import styled from "styled-components";
import { borderRadius } from "shared/lib/borderRadius";
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
  const [rules, setRules] = useState<Rules>({
    noun: [],
    verb: [],
    pronoun: [],
    adjective: [],
    adverb: [],
    conjunction: [],
    interjection: [],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [newRule, setNewRule] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<keyof Rules>("verb");

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleSave = (index: number) => {
    const updatedRules = [...(rules[currentType] || [])];
    updatedRules[index] = { rule: editValue };
    setRules({ ...rules, [currentType]: updatedRules });
    handleCancel();
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = [...(rules[currentType] || [])];
    updatedRules.splice(index, 1);
    setRules({ ...rules, [currentType]: updatedRules });
    if (index === editingIndex) {
      handleCancel();
    }
  };

  const handleEdit = (index: number) => {
    const currentRules = rules[currentType];
    if (currentRules && currentRules[index]) {
      setEditingIndex(index);
      setEditValue(currentRules[index].rule);
    }
  };

  const handleAddRule = () => {
    if (newRule.trim().length < 2) return;
    setAdding(true);
    const newItem = { rule: newRule };
    setRules({
      ...rules,
      [currentType]: [...(rules[currentType] || []), newItem],
    });
    setNewRule("");
    setAdding(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (store.currentFile && store.currentFile.rules) {
      setRules(store.currentFile.rules);
    }
  }, [store.currentFile]);

  const handleSaveAllChanges_rules = async () => {
    setIsLoading(true);
    try {
      const rulesData = {
        rules: {
          noun: rules.noun,
          verb: rules.verb,
          pronoun: rules.pronoun,
          adjective: rules.adjective,
          adverb: rules.adverb,
          conjunction: rules.conjunction,
        },
      };
      const result = await languageService.SaveAllChangesRules(id!, rulesData);
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTable = (type: keyof Rules) => (
    <Table
      dataSource={rules[type] || []} // Проверка на undefined
      columns={[
        {
          title: t("rules.rule"),
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
          title: t("rules.actions"),
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
                    {t("rules.save")}
                  </Button>
                  <Button onClick={handleCancel}>{t("rules.cancel")}</Button>
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
                    {t("rules.edit")}
                  </Button>
                  <Button danger onClick={() => handleDeleteRule(index)}>
                    {t("rules.delete")}
                  </Button>
                </>
              );
            }
          },
        },
      ]}
      pagination={false}
    />
  );

  return (
    <div>
      <div>
        <Button onClick={() => setCurrentType("noun")}>{t("rules.noun")}</Button>
        <Button onClick={() => setCurrentType("verb")}>{t("rules.verb")}</Button>
        <Button onClick={() => setCurrentType("pronoun")}>{t("rules.pronoun")}</Button>
        <Button onClick={() => setCurrentType("adjective")}>{t("rules.adjective")}</Button>
        <Button onClick={() => setCurrentType("adverb")}>{t("rules.adverb")}</Button>
        <Button onClick={() => setCurrentType("conjunction")}>{t("rules.conjunction")}</Button>
        <Button onClick={() => setCurrentType("interjection")}>{t("rules.interjection")}</Button>
      </div>

      {renderTable(currentType)}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Input
          placeholder={t("rules.enterNewRule")}
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          minLength={2}
          maxLength={100}
        />
        <Button type="primary" onClick={handleAddRule} disabled={adding}>
          {adding ? t("rules.loading") : t("rules.addRule")}
        </Button>
      </div>
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
          onClick={handleSaveAllChanges_rules}
          disabled={adding}
        >
          {adding ? t("rules.loading") : t("rules.saveChanges")}
        </Button>
      </div>
    </div>
  );
};
