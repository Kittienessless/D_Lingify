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
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button/index.tsx";

const options: Option[] = [
  {
    id: "1",
    label: "Английский",
    value: "en",
  },
  {
    id: "2",
    label: "Русский",
    value: "ru",
  },
];

export const PreferencesWidget = () => {
  const [selectedLang, setSelectedLang] = useState<Option | null>(null);
  const PreferencesBlock = styled.div`
    margin: 5px;
    padding: 3px;
    max-width: 40vw;
  `;

  const { t, i18n } = useTranslation();

  const mailto = "mailto:paraninaea@mer.ci.nsu.ru";

  const MiniContainer = styled.div`
    background: ${({ theme }) => theme.colors.container};
    min-height: 4em;
    ${borderRadius.s};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding: 5px;
  `;
  useEffect(() => {
    i18n.changeLanguage(selectedLang?.value);
  }, [selectedLang]);

  return (
    <PreferencesBlock>
      <Text>Настройки аккаунта{t("profile.changeUserInterfaceLang")}</Text>
      <Divider></Divider>
      <Space height="s"></Space>
      <MiniContainer>
        <Text>{t("profile.changeUserInterfaceLang")}</Text>

        <Select
          placeholder={t("profile.Translate1")}
          selected={selectedLang}
          options={options}
          onChange={(selection: Option) => setSelectedLang(selection)}
        />
      </MiniContainer>
      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text> {t("profile.preferences2")}</Text>
        <LogoutWidget></LogoutWidget>
      </MiniContainer>

      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text>{t("profile.preferences3")}</Text>
        <DeleteUser></DeleteUser>
      </MiniContainer>

      <Space height="s"></Space>
      <Divider></Divider>
      <MiniContainer>
        <Text>{t("profile.preferences4")}</Text>
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
