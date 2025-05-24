import React, { useEffect, useState } from "react";
import { Menu } from "shared/ui/menu";
import { OpenMenuButton } from "shared/ui/button/OpenMenuButton";
import {
  MenuOption,
  MenuOptionProps,
} from "../../../shared/ui/menu/MenuOption";
import styled, { css } from "styled-components";
import { Divider } from "shared/ui/divider";
import { Text } from "shared/ui/text";
import { EditIcon } from "shared/assets/EditIcon";
import { TrashBinIcon } from "shared/assets/TrashBinIcon";
import { SparkleIcon } from "shared/assets/SparkleIcon";
import { Button } from "shared/ui/button";
import { LangAPI } from "shared/api";
import { useNavigate, useParams } from "react-router-dom";
import languageService from "shared/api/language/languageService";
interface CartProps {
  id: string;
  title: string;
  desc: string;
}

const HeaderContainer = styled.div`
  margin-left: 95%;
  z-index: -1;
`;

export function LanguageCart({ id, title, desc }: CartProps) {
  const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.container};
    color: ${({ theme }) => theme.colors.font};
    margin-bottom: 2em;
    border-radius: 8px;
    max-width: 50em;
    max-height: fit-content;
    white-space: initial;
    padding: 2em;
    overflow: hidden;
    word-break: break-word;
  `;
  const navigate = useNavigate();

  function OnEdit(key: string) {
    navigate(`/redactLanguage/${key}`);
  }
  async function OnDelete(key: string) {
   
    await languageService.delete(key);

  }

  function OnShow(key: string) {
    navigate(`/redactLanguage/${key}`);
  }

  return (
    <Container>
      {" "}
      {id!}
      <HeaderContainer>
        <Menu
          title="Настройки языка"
          renderOpener={({ props: { ref, ...props } }) => (
            <OpenMenuButton ref={ref} {...props} />
          )}
          renderContent={({ view, onClose }) => {
            const options: MenuOptionProps[] = [
              {
                text: "Редактировать",
                onSelect: () => {
                  OnEdit(id!);
                },
                icon: <EditIcon />,
              },
              {
                text: "Просмотреть язык",
                onSelect: () => {
                  OnShow(id!);
                },
                icon: <SparkleIcon />,
              },
              {
                text: "Удалить язык",
                onSelect: () => {
                  OnDelete(id!);
                },
                icon: <TrashBinIcon />,
              },
            ];

            return options.map((props, index) => (
              <MenuOption view={view} key={index} {...props} />
            ));
          }}
        />
      </HeaderContainer>
      <Text weight={400} centerVertically height="l">
        {title}
      </Text>
      <Divider></Divider>
      <Text weight={400} centerVertically height="s">
        {desc}
      </Text>
    </Container>
  );
}
