import { UserContext } from "app/providers";
import { ILanguage } from "entities/language";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import languageService from "shared/api/language/languageService";
import { Button } from "shared/ui/button";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import { Space } from "shared/ui/space/Space.tsx";
import { borderRadius } from "shared/lib/borderRadius";
import { Divider } from "shared/ui/divider";
import { LangAPI } from "shared/api";

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

const Confirmation = () => {
  const { store } = useContext(UserContext);

  const navigate = useNavigate();

  const createLanguage = async () => {
    const result = await languageService.create(
      store.language!.Title,
      store.language!.Description
    );

    

    navigate(`/redactLanguage/${result.data.id}`);
  };
  return (
    <Wrapper>
      <Space height="m"></Space>
      <Text size={"16px"} height="s">
        Спасибо! Вы успешно создали язык
      </Text>
      <Text size={"16px"} height="s">
        {store.language!.Title}
      </Text>
      <Text size={"16px"} height="s">
        {store.language!.Description}
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
        <Button style={{ width: "fit-content" }} onClick={createLanguage}>
          Редактировать язык
        </Button>
      </div>
    </Wrapper>
  );
};
export default observer(Confirmation);
