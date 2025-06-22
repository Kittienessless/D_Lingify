import { useContext, useState } from "react";
import { UseCreateLangHook } from "shared/lib/hook/UseCreateLangHook";
import { Button } from "shared/ui/button";
import styled from "styled-components";
import { Text } from "shared/ui/text";
import { Divider } from "shared/ui/divider";
import { Space } from "shared/ui/space/Space.tsx";
import { borderRadius } from "shared/lib/borderRadius.tsx";
import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import Input from "antd/es/input/Input";
import { Form, Select, Grid } from "antd";
import { Button as AntdButon } from "antd";
import { useTranslation } from "react-i18next";
import { WithHint } from "shared/ui/tooltip/WithHint.tsx";
const Wrapper = styled.div`
  margin: 0px auto;
  max-width: 40%;
  text-align: center;
`;

const InputContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.menu};

  ${borderRadius.s};
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
const { useBreakpoint } = Grid;

const NeuralLang = () => {
  const { navigateTo } = UseCreateLangHook();
  const [Prompt, setPrompt] = useState("");
  const { store } = useContext(UserContext);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [rules, setRules] = useState<any | null>(null);

  const onFinish = (values: any) => {
    const settings: LanguageGenerationSettings = {
      ...values,
      partsOfSpeech: values.partsOfSpeech,
      grammaticalCategories: values.grammaticalCategories,
    };
    setRules(settings);
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
  const screens = useBreakpoint();

  // Определяем ширину в зависимости от ширины экрана
  const getWidth = () => {
    if (screens.xl) {
      return 1000; // очень широкий экран
    } else if (screens.lg) {
      return 600; // большой экран
    } else if (screens.md) {
      return 400; // средний экран
    } else if (screens.sm) {
      return 300; // маленький экран
    } else {
      return "100%"; // очень маленький или мобильный
    }
  };

  const width = getWidth();

  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} weight={400}>
        {t("NeuralLang.header")}
      </Text>
      <Space height="m"></Space>
      <Divider></Divider>
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
          label={t("NeuralLang.title1")}
          name="vocabularySize"
          rules={[{ required: true, message: t("NeuralLang.title3") }]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: width, minWidth: "50px" }}
              type="number"
              min={5}
              max={800}
            />
            <WithHint hint={t("hints.wordCount")}>
              <Text></Text>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item
          label={t("NeuralLang.title2")}
          name="partsOfSpeech"
          rules={[{ required: true, message: t("NeuralLang.title4") }]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select mode="multiple" placeholder={t("NeuralLang.title4")}>
              <Select.Option value="noun">
                {t("NeuralLang.title5")}
              </Select.Option>
              <Select.Option value="verb">
                {t("NeuralLang.title6")}
              </Select.Option>
              <Select.Option value="adjective">
                {t("NeuralLang.title7")}
              </Select.Option>
              <Select.Option value="adverb">
                {t("NeuralLang.title8")}
              </Select.Option>
              <Select.Option value="pronoun">
                {t("NeuralLang.title9")}
              </Select.Option>
              <Select.Option value="numeral">
                {t("NeuralLang.title10")}
              </Select.Option>
              <Select.Option value="preposition">
                {t("NeuralLang.title11")}
              </Select.Option>
              <Select.Option value="conjunction">
                {t("NeuralLang.title12")}
              </Select.Option>
              <Select.Option value="interjection">
                {t("NeuralLang.title13")}
              </Select.Option>
            </Select>
            <WithHint hint={t("hints.partsOfSpeech")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>
        <Form.Item label={t("NeuralLang.title14")} name="latinLetters">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: width, minWidth: "50px" }}
              placeholder={t("NeuralLang.title16")}
            />
            <WithHint hint={t("hints.alphabet")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>
        <Form.Item
          label={t("NeuralLang.title17")}
          name="morphologicalComplexity"
          rules={[
            {
              required: true,
              message: t("NeuralLang.title18"),
            },
          ]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select>
              <Select.Option value="simple">
                {t("NeuralLang.title19")}
              </Select.Option>
              <Select.Option value="moderate">
                {t("NeuralLang.title20")}
              </Select.Option>
              <Select.Option value="complex">
                {t("NeuralLang.title21")}
              </Select.Option>
            </Select>
            <WithHint hint={t("hints.morphologicalComplexity")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item
          label={t("NeuralLang.title22")}
          name="syntaxType"
          rules={[{ required: true, message: t("NeuralLang.title23") }]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select>
              <Select.Option value="SVO">
                {t("NeuralLang.title24")}
              </Select.Option>
              <Select.Option value="SOV">
                {t("NeuralLang.title25")}
              </Select.Option>
              <Select.Option value="VSO">
                {t("NeuralLang.title26")}
              </Select.Option>
            </Select>
            <WithHint hint={t("hints.wordOrder")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item
          label={t("NeuralLang.title27")}
          name="grammaticalCategories"
          rules={[{ required: true, message: t("NeuralLang.title28") }]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: width, minWidth: "50px" }}
              placeholder={t("NeuralLang.title29")}
            />
            <WithHint hint={t("hints.sentenceStructure")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item
          label={t("NeuralLang.title30")}
          name="styleTone"
          rules={[{ required: true, message: t("NeuralLang.title31") }]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select>
              <Select.Option value="formal">
                {t("NeuralLang.title32")}
              </Select.Option>
              <Select.Option value="informal">
                {t("NeuralLang.title33")}
              </Select.Option>
              <Select.Option value="poetic">
                {t("NeuralLang.title34")}
              </Select.Option>
              <Select.Option value="technical">
                {t("NeuralLang.title35")}
              </Select.Option>
            </Select>
            <WithHint hint={t("hints.speechStyle")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item label={t("NeuralLang.title36")} name="phoneticSystem">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: width, minWidth: "50px" }}
              placeholder={t("NeuralLang.title37")}
            />
            <WithHint hint={t("hints.phoneticSystem")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item label={t("NeuralLang.title38")} name="wordFormationRules">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: width, minWidth: "50px" }}
              placeholder={t("NeuralLang.title39")}
            />
            <WithHint hint={t("hints.wordFormationRules")}>
              <Text></Text>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item label={t("NeuralLang.title40")} name="ruleRegularityLevel">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Select>
              <Select.Option value="strict">
                {t("NeuralLang.title41")}
              </Select.Option>
              <Select.Option value="moderate">
                {t("NeuralLang.title42")}
              </Select.Option>
              <Select.Option value="loose">
                {t("NeuralLang.title43")}
              </Select.Option>
            </Select>
            <WithHint hint={t("hints.languageRegularity")}>
              <></>
            </WithHint>
          </div>
        </Form.Item>

        <Form.Item>
          <AntdButon htmlType="submit">{t("NeuralLang.title44")}</AntdButon>
        </Form.Item>
      </Form>
      <Space height="s"></Space>
      <Text size={"14px"} weight={400}>
        {t("NeuralLang.title45")}
      </Text>
      <Space height="s"></Space>
      <InputContainer>
        <Input
          name="Description"
          style={{ width: width, maxWidth: "100%", height: "auto" }}
          type="text"
          className="desc"
          onChange={(e) => setPrompt(e.target.value)}
          required={true}
          placeholder={t("NeuralLang.title46")}
        />
      </InputContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleUseAI}>{t("NeuralLang.button3")}</Button>
      </div>

      <Space height="m"></Space>
      <Divider></Divider>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => navigateTo("LangInfo")}>
          {t("NeuralLang.button1")}
        </Button>
        <Button onClick={handleNext}>{t("NeuralLang.button2")}</Button>
      </div>
    </Wrapper>
  );
};
export default observer(NeuralLang);
