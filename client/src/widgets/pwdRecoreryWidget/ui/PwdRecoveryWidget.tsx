import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "entities/user";
import { RecoverPwd } from "features/profile";
import { SUCCESSFUL_PWD_RECOVER } from "shared/constances";
import { Text } from "shared/ui/text";
 import styled from "styled-components";

const Flex = styled.div`
  padding: 10px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 25vw;
  background-color: ${({ theme }) => theme.colors.bg} !important;

  & .ant-input-affix-wrapper {
    background-color: ${({ theme }) => theme.colors.bg} !important;
    color: ${({ theme }) => theme.colors.font} !important;
    & svg {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    :placeholder-shown {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    &:placeholder-shown {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    :::placeholder {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    color: ${({ theme }) => theme.colors.font} !important;
    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    &:placeholder {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    :placeholder {
      color: ${({ theme }) => theme.colors.font} !important;
    }
    ::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.font} !important;
    }
  }

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.font} !important;
 
  }

  & .ant-input-affix-wrapper-focused {
    background-color: ${({ theme }) => theme.colors.Container} !important;
    color: ${({ theme }) => theme.colors.font} !important;
    & svg {
      color: ${({ theme }) => theme.colors.font} !important;
    }
  }
`;
export const PwdRecoveryWidget = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
   

  return (
    <Flex>
      <Text
        style={{ paddingBottom: "5vh", paddingTop: "10vh" }}
        centerHorizontally
        size={"22px"}
        weight={500}
      >
        Восстановление пароля
      </Text>{" "}
      <RecoverPwd  ></RecoverPwd>
      {result && <>{result}</>}
      {error && <>{error}</>}
    </Flex>
  );
};
