import { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { UserContext } from "app/providers";
import { useTranslation } from "react-i18next";

export const RecoverPwd = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  function handler() {
   
    store.Recover(email);
    toast.success("Успешно!");
  }

  return (
    <Form form={form} name="login" initialValues={{ remember: true }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: t("RecoverPwd.text1") }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            fontSize: 20,
            height: 40,
          }}
          placeholder={ t("RecoverPwd.text2")}
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
           {t("RecoverPwd.text33")}
        </Button>
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message:  t("RecoverPwd.text22")}]}
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
          placeholder={ t("RecoverPwd.text3")}
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
          { t("RecoverPwd.text4")}
        </Button>
      </Form.Item>
    </Form>
  );
};
