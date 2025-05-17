import React, { useEffect, useState, useSyncExternalStore } from "react";
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
  const { navigateTo, handleSetData } = UseCreateLangHook();
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEmptyPrompt, setisEmptyPrompt] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [LangName, setLangName] = useState("");
  const [descLang, setDescLang] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (prompt !== null) {
      setIsEmpty(false);
      setisEmptyPrompt(false);
      setIsDisable(true);
    }
  }, [prompt]);

  function InputOnChangeHelper(e: any) {
    if (isEmpty) {
      return (
        <Text size={"12px"} weight={400}>
          поле не должно быть пустым!
        </Text>
      );
    }
    setIsEmpty(false);
  }

  const handleNext = () => {
    setIsDisable(false);
    if (isEmpty === false) {
      setIsDisable(true);
      return <Text>Пожалуста введите все необходимые данные</Text>;
    }
    navigateTo("ImportLang");
  };

  const handleUseAI = async () => {
    
    try {
      await languageService.createNeural(prompt, LangName, descLang );
      navigateTo("Confirmation");
    } catch (e) {
      console.log(e + "\n ошибка создания языка с помощью ИИ");
    }
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
          name="Name"
          type="text"
          onChange={(e) => setLangName(e.target.value)}
          value={LangName}
          required={true}
          placeholder={"Введите название языка..."}
        />
        {isEmpty && (
          <Text size={"12px"} weight={400}>
            Название не должно быть пустым!
          </Text>
        )}
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
          onChange={(e) => setDescLang(e.target.value)}
          required={true}
          value={descLang}
          placeholder={"Введите описание языка..."}
        />
        {isEmpty && (
          <Text size={"12px"} weight={400}>
            Описание не должно быть пустым!
          </Text>
        )}
      </InputContainer>
      <Space height="s"></Space>
      <Divider></Divider>

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
          value={prompt}
          className="desc"
          onChange={(e) => setPrompt(e.target.value)}
          required={true}
          placeholder={"Введите описание вашего запроса для ИИ* ..."}
        />
      </InputContainer>

      <Space height="s"></Space>
      <Button isDisabled={!isDisable} onClick={handleUseAI}>
        Создать вместе с ИИ
      </Button>
      <Space height="s"></Space>
      <Divider></Divider>
      <Text size={"14px"} weight={400}>
        Вы так же можете импортировать свой язык в форматах .word или .json или .excel
      </Text>
      <Space height="s"></Space>

      <Uploader title={LangName}></Uploader>
      <Space height="s"></Space>
      <Divider></Divider>
      <Text size={"14px"} weight={400}>
        Либо вы можете пропустить этот шаг если хотите приступить к
        редактированию самостоятельно, нажав кнопку далее.
      </Text>
      
      <Divider></Divider>

      <Space height="s"></Space>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => navigateTo("Introduction")}>Назад</Button>
        <Button isDisabled={isDisable} onClick={handleNext}>
          Далее
        </Button>
      </div>
    </Wrapper>
  );
};

const ImportLang = () => {
  const { navigateTo, handleSetData, data } = UseCreateLangHook();

  const handleNext = () => {
    navigateTo("Confirmation");
  };

  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} height="s">
        Воспользуйтесь мастером импорта!
      </Text>
      <Text size={"12px"} height="s">
        Можно пропустить этот шаг
      </Text>
      <Divider></Divider>
      <Space height="s"></Space>
      
      <Space height="s"></Space>
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

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} height="s">
        Спасибо! Вы успешно создали язык
      </Text>
      <Divider></Divider>
      <Space height="s"></Space>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ width: "fit-content" }}
          onClick={() => navigate("/redactLanguage")}
        >
          Редактировать язык
        </Button>
      </div>
    </Wrapper>
  );
};

// Define the steps for the stepper
const steps = [
  { label: "Introduction", content: <Introduction /> },
  { label: "LangInfo", content: <LangInfo /> },
  { label: "ImportLang", content: <ImportLang /> }, //todo: переделать этот пункт. убрать
  //todo: добавить несколько других пунктов настроек 
  //todo: сделать переход к итоговой сразу если был выбран ручной способ. сделать возможность такого выбора
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
