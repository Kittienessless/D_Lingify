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
import { BASE_URL } from "shared/constances";
import { DownloadIcon } from "shared/assets/DownloadIcon";
import { useTranslation } from "react-i18next";

interface CartProps {
  id: string;
  title: string;
  desc: string;
   
}

const HeaderContainer = styled.div`
  margin-left: 95%;
  z-index: -1;
`;

export function LanguageCart({ id, title, desc } : CartProps) {
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
  const { t } = useTranslation();

  function OnEdit(key: string) {
    navigate(`/redactLanguage/${key}`);
  }
  async function OnDelete(key: string) {
    try {
      await languageService.delete(key);
      
    } catch (e) {
      
    }
  }
  async function handleDownloadFile(key: string) {
    try {
      const formData = new FormData();
      const response = await languageService.download(key);
      const a = document.createElement("a");

      a.style.display = "none";
      document.body.appendChild(a);

      formData.append("file", JSON.stringify(response.data));
      const blobFile = new Blob([JSON.stringify(response.data)], {
        type: "text/plain",
      });
      const url = window.URL.createObjectURL(blobFile);
      a.href = url;
      a.download = "Language " + title;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.log(e);
    }
  }

  function OnDownload(key: string) {
    handleDownloadFile(key);
  }

  return (
    <Container>
      {" "}
      {id!}
      <HeaderContainer>
        <Menu
          title={t("LanguageCart.text1")}
          renderOpener={({ props: { ref, ...props } }) => (
            <OpenMenuButton ref={ref} {...props} />
          )}
          renderContent={({ view, onClose }) => {
            const options: MenuOptionProps[] = [
              {
                text: t("LanguageCart.text2"),
                onSelect: () => {
                  OnEdit(id!);
                },
                icon: <EditIcon />,
              },

              {
                text: t("LanguageCart.text3"),
                onSelect: () => {
                  OnDownload(id!);
                },
                icon: <DownloadIcon />,
              },
              {
                text: t("LanguageCart.text4"),
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
