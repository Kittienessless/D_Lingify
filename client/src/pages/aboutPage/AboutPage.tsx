import styled from "styled-components";
import { Space } from "shared/ui/space";
import { Text } from "shared/ui/text";
import { borderRadius } from "shared/lib/borderRadius";
import { IconButton } from "shared/ui/button/IconButton";
import { GitHubIcon } from "shared/assets/GitHubIcon";
import { useNavigate } from "react-router-dom";
import { VK } from "shared/assets/VK";
import React from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  margin: 0 auto;
  width: 50vw;
  min-width: 30vw;
  background: ${({ theme }) => theme.colors.bg};

  @media (width <= 1350px) {
    width: 100vw;
  }
`;
const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 0.5em;
  padding: 1.4em;
  max-width: fit-content;
  height: fit-content;
  @media (width <= 1350px) {
    display: flex;
    flex-direction: column;
  }
  & svg {
    color: ${({ theme }) => theme.colors.primary} !important;
    fill: ${({ theme }) => theme.colors.primary} !important;
  }
  & svg:hover {
    color: ${({ theme }) => theme.colors.blue} !important;
    fill: ${({ theme }) => theme.colors.primary} !important;
  }
`;
const Card2 = styled.div`
  display: flex;
  @media (width <= 1350px) {
    flex-direction: column;
  }
`;
export const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handlerVK() {
    window.open("https://vk.com/id143051280", "_blank");
  }
  const handlerGitHub = () => {
    window.open("https://github.com/Kittienessless/D_Lingify", "_blank");
  };
  return (
    <Container>
      <Text weight={"bold"} height="m" size={"40px"} centerHorizontally>
        {t("about.Title")}
      </Text>
      <Space height="s" />
      <Card>
        <Text weight={400} size={"18px"}>
          {t("about.text1")}
        </Text>
      </Card>

      <Card2 style={{ display: "flex" }}>
        <Card>
          <Text weight={400} size={"18px"}>
            {t("about.text2")}
          </Text>
        </Card>
        <Card>
          <Text weight={400} size={"18px"}>
            {t("about.text3")}
          </Text>
        </Card>
      </Card2>

      <Card>
        <Text weight={400} size={"18px"}>
          {t("about.text4")}
        </Text>
      </Card>
      <Card2>
        <Card>
          <Text weight={400} size={"18px"} centerHorizontally>
            {t("about.text5")}
            <a href="mailto:paranina.thebell@gmail.com?subject=SweetWords&body=Ваши вопросы: ">
              paranina.thebell@gmail.com
            </a>
          </Text>
        </Card>
        <Card>
          <div style={{ display: "flex" }}>
            <IconButton
              title="GitHubProject"
              icon={<GitHubIcon></GitHubIcon>}
              onClick={handlerGitHub}
            ></IconButton>
            <div style={{ marginRight: "1.5em" }}></div>
            <IconButton
              title="VK"
              icon={<VK></VK>}
              onClick={handlerVK}
            ></IconButton>
          </div>
        </Card>
      </Card2>
    </Container>
  );
};
