import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { UseCreateLangHook } from "shared/lib/hook/UseCreateLangHook";
import { StepperProvider } from "shared/ui/stepper/ui/StepperContext";
import { Uploader } from "features/languageCard/ui/Uploader";
import { Button } from "shared/ui/button";
import { Stepper } from "../../../shared/ui/stepper/ui/Stepper.tsx";
import styled from "styled-components";
import { Text } from "shared/ui/text";
import { Navigate, useNavigate } from "react-router-dom";
import { Divider } from "shared/ui/divider";
import { Space } from "shared/ui/space/Space.tsx";
import { borderRadius } from "shared/lib/borderRadius.tsx";
import { LangAPI } from "shared/api/index.ts";
import languageService from "shared/api/language/languageService.ts";
import { UserContext } from "app/providers";
import { ILanguage } from "entities/language/index.ts";
import { observer } from "mobx-react-lite";
import Input from "antd/es/input/Input";
import { Form, Select } from "antd";
import { Button as AntdButon } from "antd";
import Confirmation from "./Confirmation.tsx";
const Wrapper = styled.div`
  margin: 0px auto;
  max-width: 40%;
  text-align: center;
`;

const InputContainer = styled.div`
  display: block;
  width: 100%;
  background: ${({ theme }) => theme.colors.menu};
  font-weight: 600;
  margin: 15px;
  ${borderRadius.m};
  border: 1px solid ${({ theme }) => theme.colors.menu};
  padding: 10px;
`;
const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.menu};
  height: auto;

  padding: 15px;
  min-width: 40%;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.font};

  &:focus {
    outline: none;
    border: 1px solid rgb(197, 197, 197);
    border-radius: 12px;
  }
  &.desc {
    width: 100%;
    height: auto;
    padding: 15px;
    resize: vertical !important;
  }
`;

export interface UppercaseLetters {
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
  E: boolean;
  F: boolean;
  G: boolean;
  H: boolean;
  I: boolean;
  J: boolean;
  K: boolean;
  L: boolean;
  M: boolean;
  N: boolean;
  O: boolean;
  P: boolean;
  Q: boolean;
  R: boolean;
  S: boolean;
  T: boolean;
  U: boolean;
  V: boolean;
  W: boolean;
  X: boolean;
  Y: boolean;
  Z: boolean;
}

// Определение типов для частей речи
type PartOfSpeech =
  | "noun" // существительное
  | "verb" // глагол
  | "adjective" // прилагательное
  | "adverb" // наречие
  | "pronoun" // местоимение
  | "numeral" // числительное
  | "preposition" // предлог
  | "conjunction" // союз
  | "interjection"; // междометие

// Тип для уровня морфологической сложности
type MorphologicalComplexity = "simple" | "moderate" | "complex";

// Тип для типа синтаксиса
type SyntaxType = "SVO" | "SOV" | "VSO";

// Тип для уровня регулярности правил
type RuleRegularityLevel = "strict" | "moderate" | "loose";

// Основной интерфейс настроек нейросети для создания языка
export interface LanguageGenerationSettings {
  vocabularySize: string; // объем словаря (например, 2000, 5000)
  partsOfSpeech: PartOfSpeech[]; // используемые части речи
  morphologicalComplexity: MorphologicalComplexity; // морфологическая сложность
  syntaxType: SyntaxType; // тип синтаксиса
  grammaticalCategories: string[]; // грамматические категории (род, число, падежи, времена и т.д.)
  styleTone: "formal" | "informal" | "poetic" | "technical"; // стиль и тон языка
  wordFormationRules: string; // правила словообразования (суффиксы, префиксы)
  ruleRegularityLevel: RuleRegularityLevel; // уровень регулярности правил
  latinLetters?: string[];
}

const NeuralLang = () => {
  const { navigateTo, handleSetData, data } = UseCreateLangHook();
  const [Prompt, setPrompt] = useState("");
  const { store } = useContext(UserContext);
  const [form] = Form.useForm();

  const [rules, setRules] = useState<any | null>(null);

  const onFinish = (values: any) => {
    console.log("Настройки языка:", values);
    const settings: LanguageGenerationSettings = {
      ...values,
      partsOfSpeech: values.partsOfSpeech,
      grammaticalCategories: values.grammaticalCategories,
    };
    setRules(settings);
    console.log("Объект настроек:", rules);

    store.setRules(settings);
  };

  const handleNext = () => {
    navigateTo("Confirmation");
  };
  const handleUseAI = async () => {
    try {
      store.setPrompt(Prompt);
      store.setIsNeural(true);

      navigateTo("Confirmation");
    } catch (e) {
      console.log(e + "\n ошибка создания языка с помощью ИИ");
    }
  };
  return (
    <Wrapper>
      <Space height="m"></Space>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          vocabularySize: 2000,
          partsOfSpeech: ["noun", "verb"],
          morphologicalComplexity: "simple",
          syntaxType: "SVO",
          grammaticalCategories: ["gender", "number"],
          styleTone: "formal",
          phoneticSystem: "",
          wordFormationRules: "",
          ruleRegularityLevel: "strict",
          latinLetters: "a b c d e f g h i j k l m n o p q r s t x y z ",
        }}
      >
        <Form.Item
          label="Объем словаря"
          name="vocabularySize"
          rules={[
            { required: true, message: "Пожалуйста, введите объем словаря" },
          ]}
        >
          <Input type="number" min={1} />
        </Form.Item>

        <Form.Item
          label="Части речи"
          name="partsOfSpeech"
          rules={[{ required: true, message: "Выберите части речи" }]}
        >
          <Select mode="multiple" placeholder="Выберите части речи">
            <Select.Option value="noun">Существительное</Select.Option>
            <Select.Option value="verb">Глагол</Select.Option>
            <Select.Option value="adjective">Прилагательное</Select.Option>
            <Select.Option value="adverb">Наречие</Select.Option>
            <Select.Option value="pronoun">Местоимение</Select.Option>
            <Select.Option value="numeral">Числительное</Select.Option>
            <Select.Option value="preposition">Предлог</Select.Option>
            <Select.Option value="conjunction">Союз</Select.Option>
            <Select.Option value="interjection">Междометие</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Используемые буквы латиницы"
          name="latinLetters"
          tooltip="Введите буквы через запятую или пробел"
        >
          <Input placeholder="Например, a,b,c или a b c" />
        </Form.Item>
        <Form.Item
          label="Морфологическая сложность"
          name="morphologicalComplexity"
          rules={[
            {
              required: true,
              message: "Выберите уровень морфологической сложности",
            },
          ]}
        >
          <Select>
            <Select.Option value="simple">Простая</Select.Option>
            <Select.Option value="moderate">Умеренная</Select.Option>
            <Select.Option value="complex">Сложная</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Тип синтаксиса"
          name="syntaxType"
          rules={[{ required: true, message: "Выберите тип синтаксиса" }]}
        >
          <Select>
            <Select.Option value="SVO">
              SVO (подлежащее-сказуемое-дополнение)
            </Select.Option>
            <Select.Option value="SOV">
              SOV (подлежащее-дополнение-сказуемое)
            </Select.Option>
            <Select.Option value="VSO">
              VSO (сказуемое-подлежащее-дополнение)
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Грамматические категории"
          name="grammaticalCategories"
          rules={[
            { required: true, message: "Выберите грамматические категории" },
          ]}
        >
          {/* Можно использовать Input или Select с множественным выбором */}
          {/* Для простоты используем Input */}
          <Input placeholder="Например, gender, number, case" />
        </Form.Item>

        <Form.Item
          label="Стиль и тон"
          name="styleTone"
          rules={[{ required: true, message: "Выберите стиль и тон" }]}
        >
          <Select>
            <Select.Option value="formal">Формальный</Select.Option>
            <Select.Option value="informal">Неформальный</Select.Option>
            <Select.Option value="poetic">Поэтический</Select.Option>
            <Select.Option value="technical">Технический</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Фонетическая система" name="phoneticSystem">
          <Input placeholder="Описание фонетической системы" />
        </Form.Item>

        <Form.Item label="Правила словообразования" name="wordFormationRules">
          <Input placeholder="Правила словообразования" />
        </Form.Item>

        <Form.Item
          label="Уровень регулярности правил"
          name="ruleRegularityLevel"
        >
          <Select>
            <Select.Option value="strict">Строгий</Select.Option>
            <Select.Option value="moderate">Умеренный</Select.Option>
            <Select.Option value="loose">Свободный</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <AntdButon htmlType="submit">Сохранить настройки</AntdButon>
        </Form.Item>
      </Form>
      <Space height="s"></Space>
      <Text size={"14px"} weight={400}>
        Вы можете создать язык с помощью Искусственного Интеллекта основанного
        на GigaChat. Введите описание языка и Ваш запрос с описанием ниже. Вы
        можете указать жетальное количество слов (не более 10.000 слов), правила
        и другие данные. ИИ их обработает и выдаст результат. Если результат Вас
        не устроит, в редакторе языка Вы сможете отредактировать нужные поля.
      </Text>
      <Space height="s"></Space>
      <InputContainer>
        <StyledInput
          name="Description"
          type="text"
          className="desc"
          onChange={(e) => setPrompt(e.target.value)}
          required={true}
          placeholder={"Введите описание вашего запроса для ИИ* ..."}
        />
      </InputContainer>

      <Space height="s"></Space>
      <Button onClick={handleUseAI}>Создать вместе с ИИ</Button>
      <Space height="s"></Space>
      <Divider></Divider>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => navigateTo("LangInfo")}>Назад</Button>
        <Button onClick={handleNext}>Далее</Button>
      </div>
    </Wrapper>
  );
};
export default observer(NeuralLang);
