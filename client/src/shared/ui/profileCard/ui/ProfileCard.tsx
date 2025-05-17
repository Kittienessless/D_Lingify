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

const ProfileCard: FC = () => {
  const [error, setError] = useState("");
  const { store } = useContext(UserContext);
 

  const navigate = useNavigate();
  const [user, setUser] = useState<user>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
 
      
    }
   if(store.isAuth) {
    try {
      getUsers()
    } catch (e) {
       return navigate('/Auth')
    }
   }
  
  }, [store.isAuth]);
  const getUsers = async () => {
    const response = await UserService.fetchUser();
    setUser(response.data);
  };

  if (store.isLoading) {
    return <Loader></Loader>;
  }
  if (!store.isAuth) {
    return <LoginWidget />;
  }
  
  return (
    <>
      <Text size={"22px"} height="m" weight={"bold"}>
        Профиль пользователя
      </Text>
      <Space height="s"></Space>

      <div>
        {store.isAuth ? (
          <div style={{ maxWidth: "50%" }}>
            <CopyText content={store.user?.email}>
              E-mail: {store.user?.email}
            </CopyText>

            <Divider></Divider>
            <Space height="s"></Space>
            <div style={{ display: 'flex', alignItems: 'center',  marginRight: '25px'}}>
            <Text  style={{    marginRight: '25px'}}>Имя: </Text>
            <Text>     
              {user?.given_name ? user?.given_name : "No data"}
            </Text>
              </div>
           

            <Space height="s"></Space>
            <Divider></Divider>
            <Space height="s"></Space>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px'}}>
            <Text style={{    marginRight: '25px'}}>Фамилия:</Text>
            <Text>   {user?.familyName ?  user?.familyName : "No data"}</Text>
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
