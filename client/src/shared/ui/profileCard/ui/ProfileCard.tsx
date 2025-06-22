import React, { useState, useEffect, useContext, FC } from "react";
import { Divider } from "shared/ui/divider";
import { TextField } from "shared/ui/editableInput";
import { Text } from "shared/ui/text";
import { UserContext } from "app/providers";
import { user } from "entities/user";
import { useNavigate } from "react-router-dom";
import UserService from "shared/api/user/UserService";
import { observer } from "mobx-react-lite";
import { LoginWidget } from "widgets/loginWidget";
import { Loader } from "shared/ui/loaders";
import axios, { AxiosResponse } from "axios";
import { Space } from "shared/ui/space";
import { CopyText } from "shared/ui/text/CopyText";
import styled from "styled-components";
import { centerContent } from "shared/lib/centerContent";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button";
import { Form, Input } from "antd";
import { IconButton } from "shared/ui/button/IconButton";
import { EditIcon } from "shared/assets/EditIcon";
import {
  CloseCircleOutlined,
  SaveFilled,
  SaveOutlined,
} from "@ant-design/icons";

const ProfileCard: FC = () => {
  const [error, setError] = useState("");
  const { store } = useContext(UserContext);
  const { t } = useTranslation();
  const [hasFetched, setHasFetched] = useState<boolean>(false); // чтобы фетчить один раз
  const [value, setValue] = useState<user | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<user>();
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingF, setIsEditingF] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      given_name: user?.given_name,
    });
  };
  const handleEditF = () => {
    setIsEditingF(true);
    form.setFieldsValue({
      given_name: user?.familyName,
    });
  };

  useEffect(() => {
    if (store.isAuth) {
      try {
        getUsers();
        setIsEditing(false);
        setIsEditingF(false);
        setHasFetched(true);
      } catch (e) {
        return navigate("/Auth");
      }
    }
  }, [store.user]);

  const getUsers = async () => {
    const response = await UserService.fetchUser();
    setUser(response.data);
    setName(response.data.given_name!);
    setFamilyName(response.data.familyName!);
  };
  const Round = styled.div`
    height: 1em;
    width: 1em;
    border-radius: 100%;
    background-color: ${store.user.isActivated ? "rgb(35, 226, 32)" : "red"};
  `;
  const Activated = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
  `;

  if (store.isLoading) {
    return <Loader></Loader>;
  }
  if (!store.isAuth) {
    return <LoginWidget />;
  }
  // Сохранение изменений
  const handleSave = async (given_name: string) => {
    const res = await UserService.changeGivenName(given_name);
    store.setUser(res.data);
    setUser(store.user);
    setName(store.user.given_name!);
    setIsEditing(false);
  };
  const handleSaveFN = async (familyName: string) => {
    const res = await UserService.changeFamilyName(familyName);
    store.setUser(res.data);
    setUser(store.user);
    setFamilyName(store.user.familyName!);
    setIsEditingF(false);
  };

  const handleGivenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name) {
      setName(e.target.value);
    }
  };
  const handleFamilyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (familyName) {
      setFamilyName(e.target.value);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };
  const handleCancelF = () => {
    setIsEditingF(false);
    form.resetFields();
  };
  return (
    <>
      <Text size={"18pt"} height="m">
        {t("profile.user1")}
      </Text>
      <Space height="s"></Space>
      <div>
        {store.isAuth ? (
          <div style={{ maxWidth: "50%" }}>
            <CopyText content={store.user?.email}>
              {t("profile.user2")} {store.user?.email}
            </CopyText>
            <Activated>
              <Round />
              <Text style={{ marginLeft: "1em" }}>
                {user?.isActivated ? t("profile.user3") : t("profile.user4")}
              </Text>
            </Activated>
            <Divider></Divider>
            <Space height="s"></Space>

            {!isEditing ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <div>
                  <Text>
                    {t("profile.user5")}
                    {user?.given_name || t("profile.user7")}
                  </Text>
                </div>
                <IconButton
                  title={t("buttons.save")}
                  icon={<EditIcon />}
                  onClick={handleEdit}
                />
              </div>
            ) : (
              <Form form={form} layout="vertical" style={{ marginTop: "8px" }}>
                <Form.Item
                  name="given_name"
                  rules={[
                    {
                      required: true,
                      message: t("profile.hintLatinLetters"),
                    },
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <Input value={name} onChange={handleGivenNameChange} />{" "}
                    <IconButton
                      icon={<SaveOutlined />}
                      title={t("buttons.save")}
                      onClick={() => handleSave(name)}
                    />
                    <IconButton
                      icon={<CloseCircleOutlined />}
                      title={t("buttons.save")}
                      onClick={handleCancel}
                    />
                  </div>
                </Form.Item>
              </Form>
            )}
            {!isEditingF ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <div>
                  <Text>
                    {t("profile.user6")}
                    {user?.familyName || t("profile.user7")}
                  </Text>
                </div>
                <IconButton
                  title={t("buttons.save")}
                  icon={<EditIcon />}
                  onClick={handleEditF}
                />
              </div>
            ) : (
              <Form form={form} layout="vertical" style={{ marginTop: "8px" }}>
                <Form.Item
                  name="familyName"
                  rules={[
                    {
                      required: true,
                      message: t("profile.hintLatinLetters"),
                    },
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <Input
                      value={familyName}
                      onChange={handleFamilyNameChange}
                    />{" "}
                    <IconButton
                      icon={<SaveOutlined />}
                      title={t("buttons.save")}
                      onClick={() => handleSaveFN(familyName)}
                    />
                    <IconButton
                      icon={<CloseCircleOutlined />}
                      title={t("buttons.save")}
                      onClick={handleCancelF}
                    />
                  </div>
                </Form.Item>
              </Form>
            )}
          </div>
        ) : (
          "Invalid authentication"
        )}
      </div>

      {error && <div>{error}</div>}
    </>
  );
};
export default observer(ProfileCard);
