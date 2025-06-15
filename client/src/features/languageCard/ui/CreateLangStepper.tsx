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
  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"18px"} height="s">
        Добро пожаловать в мастер создания языка!
      </Text>
      <Text size={"16px"} height="s">
        Введите данные языка или загрузите с помощью мастера загрузки
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
        <Button onClick={() => navigateTo("LangInfo")}>Далее</Button>
      </div>
    </Wrapper>
  );
};

const LangInfo = () => {
  const { store } = useContext(UserContext);

  const { navigateTo, handleSetData } = UseCreateLangHook();
  // const [isEmpty, setIsEmpty] = useState(true);
  // const [isEmptyPrompt, setisEmptyPrompt] = useState(true);
  //const [isDisable, setIsDisable] = useState(true);
  const [Title, setLangName] = useState("");
  const [Description, setDescLang] = useState("");

  const handleNext = async () => {
    await store.setLanguage(Title, Description);
 

    navigateTo("CreateLangNeural");
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setLanguage(Title, Description);
    setLangName(e.currentTarget.value);
  };
  const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescLang(e.currentTarget.value);
  };
  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} weight={400}>
        Пожалуста введите информацию о языке
      </Text>
      <Divider></Divider>
      <Space height="s"></Space>
      <InputContainer>
        <Text size={"16px"} weight={500}>
          Название*:{" "}
        </Text>
        <Space height="s"></Space>

        <StyledInput
          name="Title"
          type="text"
          className="desc"
          
          onChange={(e) => onChangeName(e)}
          placeholder={"Введите описание языка..."}
        />
        {/*  {isEmpty && (
          <Text size={"12px"} weight={400}>
            Название не должно быть пустым!
          </Text>
        )} */}
        <Space height="s"></Space>

        <Divider></Divider>
        <Text size={"16px"} weight={400}>
          Описание:{" "}
        </Text>
        <Space height="s"></Space>

        <StyledInput
          name="Description"
          type="text"
          
          className="desc"
          onChange={(e) => onChangeDesc(e)}
          placeholder={"Введите описание языка..."}
        />
        {/*   {isEmpty && (
          <Text size={"12px"} weight={400}>
            Описание не должно быть пустым!
          </Text>
        )} */}
      </InputContainer>
      <Space height="s"></Space>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => navigateTo("Introduction")}>Назад</Button>
        <Button onClick={handleNext}>Далее</Button>
      </div>
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
