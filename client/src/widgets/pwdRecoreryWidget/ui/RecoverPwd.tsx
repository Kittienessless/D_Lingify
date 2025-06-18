import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "entities/user";
import { SUCCESSFUL_PWD_RECOVER } from "shared/constances";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import { UserContext } from "app/providers";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

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

export const RecoverPwd = () => {
  const { store } = useContext(UserContext);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const { t } = useTranslation();

  function handler() {
    store.SendNewPwd(email, code);
  }

  return (
    <Flex>
      <Form form={form} name="login" initialValues={{ remember: true }}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t("RecoverPwd.text1") },
          ]}
        >
          <Input
            style={{
              fontSize: 20,
              height: 40,
              marginTop: 50,
            }}
            value={code}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder={t("RecoverPwd.text1")}
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[
            { required: true, message: t("RecoverPwd.text5") },
          ]}
        >
          <Input
            style={{
              fontSize: 20,
              height: 40,
              marginTop: 50,
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            placeholder={t("RecoverPwd.text5")}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            style={{
              fontSize: 20,
              height: 40,
            }}
            block
            onClick={handler}
            type="primary"
          >
           {t("RecoverPwd.text4")}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
