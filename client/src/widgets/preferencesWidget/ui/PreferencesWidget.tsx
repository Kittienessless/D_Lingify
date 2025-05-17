import react, { useEffect, FC } from "react";
import styled from "styled-components";
import { LogoutWidget } from "widgets/logoutWidget/ui/LogoutWidget";
import { DeleteUser } from "features/profile/ui/DeleteUser";
import { MailIcon } from "shared/assets/MailIcon";
import { Text } from "shared/ui/text";
import { Space } from "shared/ui/space";
import { IconButton } from "shared/ui/button/IconButton";
import { borderRadius } from "shared/lib/borderRadius";
import { Divider } from "shared/ui/divider/divider.tsx";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { useState } from "react";
import { FireIcon } from "shared/assets/FireIcon.tsx";
// theme switcher
// logout
// delete account
// email to team
// выбор языка интерфейса

interface IGetUserKey {
  key: string;
}

const options: Option[] = [
  {
    label: "Английский",
    value: "English",
  },
  {
    label: "Русский",
    value: "Russian",
  },
];
export const PreferencesWidget = () => {
  //прокинуть и сюда пропс с ключом пользователя?
  const [selectedLang, setSelectedLang] = useState<Option | null>(null);
  const PreferencesBlock = styled.div`
    margin: 5px;
    padding: 3px;
    max-width: 40vw;
  `;

  const mailto = "mailto:paraninaea@mer.ci.nsu.ru";

  const MiniContainer = styled.div`
   background:  ${({ theme }) => theme.colors.container  };

    ${borderRadius.s};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding: 5px;
  `;

  //получить инфу о том что вошел или нет ?

  return (
    <PreferencesBlock>
      <Text  >Настройки аккаунта</Text>
      <Divider></Divider>
      <Space height="s"></Space>
      <MiniContainer>
        <Text  >Сменить язык интерфейса:</Text>
        <Select  
          placeholder="Выберите язык"
          selected={selectedLang}
          options={options}
          onChange={(selection: Option) => setSelectedLang(selection)}
        />
      </MiniContainer>
      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text  >Выйти из аккаунта:</Text>
        {/* сюда тоже ключ? */}
        <LogoutWidget></LogoutWidget>
      </MiniContainer>

      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text  >Удалить аккаунт:</Text>
        <DeleteUser></DeleteUser>
      </MiniContainer>

      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text  >Если у вас есть вопросы можете написать нам на почту: </Text>
        <IconButton
          icon={<MailIcon />}
          title="paraninaea@mer.ci.nsu.ru"
          onClick={(e) => {
            window.location.href = mailto;
            e.preventDefault();
          }}
        />
      </MiniContainer>
    </PreferencesBlock>
  );
};
