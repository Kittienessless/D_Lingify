import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Card, Table, Button, Input, Space } from "antd";
import languageService from "shared/api/language/languageService";
import { ILanguage } from "entities/language";

const { TabPane } = Tabs;

// Типы данных
interface Rule {
  key: string;
  rule: string;
  value: string;
  example: string;
}

interface DictionaryWord {
  key: string;
  word: string;
  translation: string;
  example: string;
}

export const RedactLanguage: React.FC = () => {
  const [langInfo, setLangInfo] = useState<ILanguage>();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [file, setFile] = useState<FormData>()
  useEffect(() => {
    const fetchLangData = async () => {
      try {
        const response = await languageService.getLanguage(id!);
        setLangInfo(response.data.lang);
        const fileResponse = await languageService.getFileLang(id!);
        setFile(fileResponse.data);
       } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    fetchLangData();
  }, []);
  // Данные для таблиц
  const [nounRules, setNounRules] = useState<Rule[]>([
    {
      key: "1",
      rule: "Правило существительных",
      value: "Правило 1",
      example: "Пример 1",
    },
    // ...другие правила
  ]);

  const [verbRules, setVerbRules] = useState<Rule[]>([
    {
      key: "1",
      rule: "Правило глаголов",
      value: "Правило 2",
      example: "Пример 2",
    },
    // ...другие правила
  ]);

  const [syntaxRules, setSyntaxRules] = useState<Rule[]>([
    {
      key: "1",
      rule: "Правила синтаксиса",
      value: "Правило 3",
      example: "Пример 3",
    },
    // ...другие правила
  ]);

  const [dictionaryWords, setDictionaryWords] = useState<DictionaryWord[]>([
    { key: "1", word: "Apple", translation: "Яблоко", example: "I like Apple" },
    // ...больше слов для пагинации
  ]);

  const [newWord, setNewWord] = useState<string>("");

  // Обработчики для таблиц (редактирование, удаление)

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
        <Space>
          <Button>Edit </Button>
          <Button danger>Delete </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h2>Редактор языка - {id}</h2>
      <h2> ID : {langInfo?.id}</h2>
      <h2>Редактор языка {langInfo?.Title}</h2>
      <h2>Редактор языка {langInfo?.Description}</h2>
      <h2>{error}</h2>
      <h2>{String(file)}</h2>

      <div style={{ width: "80%", maxWidth: "1200px" }}>
        <Tabs defaultActiveKey="1" centered>
          {/* Грамматика */}
          <TabPane tab="Грамматика" key="grammar">
            {/* Карточки правил */}
            <Card
              style={{
                borderRadius: "8px",
                backgroundColor: "#D5D5D5",
                marginBottom: "16px",
              }}
              title="Существительные"
            >
              {/* Таблица правил */}
              <Table
                dataSource={nounRules}
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
            </Card>
            <Card
              style={{ borderRadius: "8px", backgroundColor: "#D5D5D5" }}
              title="Глаголы"
            >
              {/* Таблица правил */}
              <Table
                dataSource={verbRules}
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
            </Card>
            <Card
              style={{ borderRadius: "8px", backgroundColor: "#D5D5D5" }}
              title="Другие правила"
            >
              {/* Таблица правил */}
              {/* Аналогично */}
            </Card>
          </TabPane>

          {/* Синтаксис */}
          <TabPane tab="Синтаксис" key="syntax">
            {/* Карточки правил синтаксиса */}
            {/* Аналогично карточкам выше */}
          </TabPane>

          {/* Словарь */}
          <TabPane tab="Словарь" key="dictionary">
            {/* Таблица словаря с пагинацией и вводом новых данных */}
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
          </TabPane>
        </Tabs>
        {/* Кнопка сохранить */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Button type="primary">Сохранить</Button>
        </div>
      </div>
    </div>
  );
};
