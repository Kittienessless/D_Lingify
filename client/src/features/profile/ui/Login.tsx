import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Space } from "antd";
import { UserContext } from "app/providers";
import { toast } from "react-toastify";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { AuthResponse } from "shared/types/responseTypes";
import $api from "shared/api/http";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "shared/constances";
import { JSX } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  function loginHandler() {
    store.login(email, password);
    toast.success("Успешно!");
    navigate("/Profile");
  }

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
        
        navigate("/Profile");
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    flow: "auth-code",
  });

  return (
    <Form form={form} name="login" initialValues={{ remember: true }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: t("Login.text1")}]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            fontSize: 20,
            height: 40,
          }}
          prefix={<UserOutlined />}
          placeholder={t("Login.text2")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t("Login.text3")}]}
      >
        <Input
          style={{
            fontSize: 20,
            height: 40,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("Login.text4")}
        />
      </Form.Item>
      <Form.Item>
        <Flex align="left">
          <Space size="large">
            <Button
              size="small"
              style={{
                fontSize: 16,
                height: 40,
              }}
              type="link"
              onClick={() => navigate("/Auth/recover")}
            >
              {t("Login.text5")}
            </Button>
          </Space>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          onClick={() => loginHandler()}
          style={{
            fontSize: 20,
            height: 40,
          }}
          block
          type="primary"
        >
          {t("Login.text6")}
        </Button>

        <Form.Item style={{ marginTop: 10, width: "100%" }}>
          <Button
            size="large"
            style={{
              fontSize: 16,
              height: 40,
              width: "100%",
            }}
            type="primary"
            onClick={() => {
              googleLogin();
            }}
          >
            {t("Login.text7")}
          </Button>
        </Form.Item>

        <Button
          size="large"
          style={{
            fontSize: 16,
            height: 40,
          }}
          type="link"
          onClick={() => navigate("/Auth/register")}
        >
         {t("Login.text8")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(Login);
