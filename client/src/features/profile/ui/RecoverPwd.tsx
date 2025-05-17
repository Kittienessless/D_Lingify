import { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { UserContext } from "app/providers";

export const RecoverPwd = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { store } = useContext(UserContext);

  function handler() {
   
    store.Recover(email);
    toast.success("Успешно!");
  }

  return (
    <Form form={form} name="login" initialValues={{ remember: true }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            fontSize: 20,
            height: 40,
          }}
          placeholder="Email"
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
          type="primary"
          onClick={() => handler()}
        >
          Отправить код
        </Button>
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          style={{
            fontSize: 20,
            height: 40,
            marginTop: 50,
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="number"
          placeholder="Введите пароль сюда"
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
          type="primary"
          htmlType="submit"
        >
          Восстановить
        </Button>
      </Form.Item>
    </Form>
  );
};
