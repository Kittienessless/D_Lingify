import { useContext, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";
import axios, { AxiosResponse } from "axios";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { AuthResponse } from "shared/types/responseTypes";
import { Toaster } from "shared/ui/toasters";
import { useTranslation } from "react-i18next";
export const Register = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [doublePassword, setDoublePassword] = useState("");
  const [email, setEmail] = useState("");
  const [given_name, setGivenName] = useState("");
  const { t } = useTranslation();

  const [family_name, setFamilyName] = useState("");
  const [list, setList] = useState<any[]>([]);
  let toastProperties: any = null;
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  const Helper = styled.div`
    ${CenterAbsolutely};
    color: ${({ theme }) => theme.colors.font};
    font-size: 24px;
  `;

  const showToast = (type: any) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Success",
          description: "This is a success toast component",
          backgroundColor: "#5cb85c",
        };
        break;
      case "danger":
        toastProperties = {
          id: list.length + 1,
          title: "Danger",
          description: "This is a danger toast component",
          backgroundColor: "#d9534f",
        };
        break;
      case "info":
        toastProperties = {
          id: list.length + 1,
          title: "Info",
          description: "This is a info toast component",
          backgroundColor: "#5bc0de",
        };
        break;
      case "warning":
        toastProperties = {
          id: list.length + 1,
          title: "Warning",
          description: "This is a warning toast component",
          backgroundColor: "#f0ad4e",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post<AuthResponse>(
          "http://localhost:5000/auth/googleAuth",
          {
            code,
          },
          {
            withCredentials: true,
          }
        );
        store.google(response);
        showToast("success");

        navigate("/Profile");
      } catch (e) {
        console.log(e);
        showToast("danger");
      } finally {
      }
    },
    flow: "auth-code",
  });
  function registerHandler() {
    try {
      store.register(email, password);
      showToast("success");
    } catch (e) {
      showToast("danger");
    }
  }
  return (
    <div>
      <Space></Space>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="register"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t("Register.text1") },
            { type: "email", message: t("Register.text2") },
          ]}
          hasFeedback
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<MailOutlined />}
            type="email"
            placeholder={t("Register.text22")}
          />
        </Form.Item>
        <Form.Item
          name="Name"
          rules={[
            { required: true, message: t("Register.text3") },
            { type: "email", message: t("Register.text43") },
          ]}
          hasFeedback
        >
          <Input
            value={given_name}
            onChange={(e) => setGivenName(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<UserOutlined />}
            type="text"
            placeholder={t("Register.text4")}
          />
        </Form.Item>
        <Form.Item
          name="FamilyName"
          rules={[
            { required: true, message: t("Register.text5") },
            { type: "email", message: t("Register.text6") },
          ]}
          hasFeedback
        >
          <Input
            value={family_name}
            onChange={(e) => setFamilyName(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<UserOutlined />}
            type="text"
            placeholder={t("Register.text7")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true },
            { min: 5, message: t("Register.text8") },
            { max: 20, message: t("Register.text9") },
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<LockOutlined />}
            placeholder={t("Register.text10")}
          />
        </Form.Item>

        <Form.Item
          name="passwordConfirm"
          dependencies={["password"]}
          rules={[
            { required: true },
            { min: 5, message: t("Register.text8") },
            { max: 20, message: t("Register.text9") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t("Register.text12"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            value={doublePassword}
            onChange={(e) => setDoublePassword(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<LockOutlined />}
            placeholder={t("Register.text13")}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            style={{
              fontSize: 20,
              height: 40,
            }}
            block
            type="primary"
            onClick={() => registerHandler()}
          >
            {t("Register.text14")}
          </Button>
          <Form.Item style={{ marginTop: 10, width: "100%" }}>
            <Button
              size="large"
              style={{
                fontSize: 20,
                height: 40,
                width: "100%",
              }}
              type="primary"
              onClick={() => {
                googleLogin();
              }}
            >
              {t("Register.text15")}
            </Button>
          </Form.Item>
          <Button
            size="large"
            style={{
              fontSize: 16,
              height: 40,
            }}
            type="link"
            onClick={() => navigate("/Auth")}
          >
            {t("Register.text16")}
          </Button>
        </Form.Item>
      </Form>
      <Toaster toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
};
