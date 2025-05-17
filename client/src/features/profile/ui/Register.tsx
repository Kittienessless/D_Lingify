import { useContext, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/providers";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";

export const Register = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [doublePassword, setDoublePassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  const Helper = styled.div`
    ${CenterAbsolutely};
    color: ${({ theme }) => theme.colors.font};
    font-size: 24px;
  `;

  function registerHandler() {
    store.register(email, password);
    toast.success("Успешно!");
    return (
      <Helper>
        Зайдите на указанную почту и перейдите по ссылке чтобы активировать
        аккаунт
      </Helper>
    );
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
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "please enter a valid email" },
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
            placeholder="Email"
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
            placeholder="Password"
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
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            style={{
              fontSize: 20,
              height: 50,
            }}
            block
            type="primary"
            onClick={() => registerHandler()}
          >
            Зарегестрироваться
          </Button>
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
    </div>
  );
};
