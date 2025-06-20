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
import { Descriptions, Form } from "antd";
import NeuralLang from "./NeuralLang.tsx";
import Confirmation from "./Confirmation.tsx";
import { useTranslation } from "react-i18next";

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

const Introduction = () => {
  const { navigateTo } = UseCreateLangHook();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16pt"} height="s">
        {t("Introduction.header1")}
      </Text>
      <Text size={"14pt"} height="s">
        {t("Introduction.header2")}
      </Text>
      <Space height="s"></Space>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Button onClick={() => navigateTo("LangInfo")}>
          {t("Introduction.button")}
        </Button>
      </div>
    </Wrapper>
  );
};

const LangInfo = () => {
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { navigateTo, handleSetData } = UseCreateLangHook();

  const [Title, setLangName] = useState("");
  const [Description, setDescLang] = useState("");

  const isFieldsFilled = () => {
    const values = form.getFieldsValue();
    return Object.values(values).every(
      (val: any) => val && val.trim().length >= 2
    );
  };

  const handleNext = async () => {
    await store.setLanguage(Title, Description);
    navigateTo("CreateLangNeural");
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} weight={400}>
        {t("LangInfo.header1")}
      </Text>
      <Divider></Divider>
      <Space height="s"></Space>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: "", desc: "" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("Label.title")}
          name="title"
          rules={[
            { required: true, message: t("Message.input1") },
            { min: 2, message: t("Message.min") },
            { max: 200, message: t("Message.max") },
          ]}
        >
          <Input
            value={Title}
            onChange={(e) => setLangName(e.target.value)}
            placeholder={t("Placeholder.title")}
          />
        </Form.Item>

        <Form.Item
          label={t("Label.desc")}
          name="desc"
          rules={[
            { required: true, message: t("Message.input2") },
            { min: 2, message: t("Message.min") },
            { max: 200, message: t("Message.max") },
          ]}
        >
          <Input
            value={Description}
            onChange={(e) => setDescLang(e.target.value)}
            placeholder={t("Placeholder.desc")}
          />
        </Form.Item>

        <div style={{ display: "flex" }}>
          <Button onClick={() => navigateTo("Introduction")}>
            {t("LangInfo.button1")}
          </Button>
          <Button primary isDisabled={!isFieldsFilled()} onClick={handleNext}>
            {t("LangInfo.button2")}
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default observer(LangInfo);

// Define the steps for the stepper
const steps = [
  { label: "Introduction", content: <Introduction /> },
  { label: "LangInfo", content: <LangInfo /> },
  { label: "CreateLangNeural", content: <NeuralLang /> },
  { label: "Confirmation", content: <Confirmation /> },
];

// Use the StepperProvider to wrap your stepper
export const CreateLangStepper = () => (
  <StepperProvider
    initialData={{ title: "", description: "", author: "" }} // Set initial form data
    steps={steps}
  >
    <Stepper />
  </StepperProvider>
);
