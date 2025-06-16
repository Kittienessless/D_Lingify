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

const ProfileCard: FC = () => {
  const [error, setError] = useState("");
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [user, setUser] = useState<user>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    if (store.isAuth) {
      try {
        getUsers();
      } catch (e) {
        return navigate("/Auth");
      }
    }
  }, [store.isAuth]);
  const getUsers = async () => {
    const response = await UserService.fetchUser();
    setUser(response.data);
  };
  const Round = styled.div`
    height: 1em;
    width: 1em;
    border-radius: 100%;
    background-color: ${store.user.isActivated ? 'rgb(35, 226, 32)' : "red"};
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
             {t("profile.user2")}  {store.user?.email}
            </CopyText>
            <Activated>
              <Round />
              <Text style={{ marginLeft: "1em" }}>
                {user?.isActivated
                  ?  t("profile.user3") 
                  :  t("profile.user4") }
              </Text>
            </Activated>
            <Divider></Divider>
            <Space height="s"></Space>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "25px",
              }}
            >
              <Text style={{ marginRight: "25px" }}> {t("profile.user5")}  </Text>
              <Text>{user?.given_name ? user?.given_name :  t("profile.user7")}</Text>
            </div>

            <Space height="s"></Space>
            <Divider></Divider>
            <Space height="s"></Space>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
              <Text style={{ marginRight: "25px" }}> {t("profile.user6")} </Text>
              <Text> {user?.familyName ? user?.familyName :  t("profile.user7")}</Text>
            </div>

            <Space height="s"></Space>
            <Divider></Divider>
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
