import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space } from "antd";
import styled from "styled-components";
import Card from "antd/es/card/Card";
import { borderRadius } from "shared/lib/borderRadius";
import { Text } from "shared/ui/text";

// Типы данных
interface Rule {
  key: string;
  rule: string;
  value: string;
  example: string;
}
const CardLang = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin: 1em;
  ${borderRadius.m};
  width: 50%;
`;
const SyntaxContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  padding-left: 1em;
  display: flex;
`;

export const Syntax: React.FC = () => {
  const [syntaxRules, setSyntaxRules] = useState<Rule[]>([
    {
      key: "1",
      rule: "Правило syntax",
      value: "Правило 1",
      example: "Пример 1",
    },
    // ...другие правила
  ]);
  return (
    <SyntaxContainer>
      <CardLang>
        <Text height="s" size={"12pt"}>
          Синтаксис
        </Text>

        <Table
          dataSource={syntaxRules}
          columns={[
            { title: "Правило", dataIndex: "rule", key: "rule" },
            { title: "Значение", dataIndex: "value", key: "value" },
            { title: "Пример", dataIndex: "example", key: "example" },
            {
              title: "Действия",
              key: "actions",
              render: (text, record) => (
                <Space>
                  <Button>Edit</Button>
                  <Button danger>Delete</Button>
                </Space>
              ),
            },
          ]}
          pagination={false}
        />
      </CardLang>
    </SyntaxContainer>
  );
};
