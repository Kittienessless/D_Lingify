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
export const Register = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [doublePassword, setDoublePassword] = useState("");
  const [email, setEmail] = useState("");
  const [given_name, setGivenName] = useState("");

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
            { required: true, message: "Пожалуйста введите Вашe почту" },
            { type: "email", message: "Пожалуйста введите корректную почту" },
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
            placeholder="Почта"
          />
        </Form.Item>
        <Form.Item
          name="Name"
          rules={[
            { required: true, message: "Пожалуйста введите Ваше Имя" },
            { type: "email", message: "Пожалуйста введите корректное имя" },
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
            placeholder="Имя"
          />
        </Form.Item>
        <Form.Item
          name="FamilyName"
          rules={[
            { required: true, message: "Пожалуйста введите Вашу фамилию" },
            { type: "email", message: "Пожалуйста введите корректную Фамилию" },
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
            placeholder="Фамилия"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true },
            { min: 4, message: "password must be more than 4 symbols " },
            { max: 10, message: "password must be less than 10 symbols " },
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
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item
          name="passwordConfirm"
          dependencies={["password"]}
          rules={[
            { required: true },
            { min: 4, message: "password must be more than 4 symbols " },
            { max: 10, message: "password must be less than 10 symbols " },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords are must be the same");
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
            placeholder="Подтвердить пароль"
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
            Зарегестрироваться
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
              Войти с помощью Google
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
            или Войти!
          </Button>
        </Form.Item>
      </Form>
      <Toaster toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
};
