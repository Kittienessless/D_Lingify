import styled from "styled-components";
import { Space } from "shared/ui/space";
import { Text } from "shared/ui/text";
import { borderRadius } from "shared/lib/borderRadius";
import { IconButton } from "shared/ui/button/IconButton";
import { GitHubIcon } from "shared/assets/GitHubIcon";
import { useNavigate } from "react-router-dom";
import { VK } from "shared/assets/VK";
import React from "react";

const Container = styled.div`
  margin: 10px;
  position: relative;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 50vw;
  min-width: 30vw;
  background: ${({ theme }) => theme.colors.bg};
  display: block;
`;
const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 0.5em;
  padding: 1.4em;
  max-width: fit-content;
  height: fit-content;

  & svg {
    color: ${({ theme }) => theme.colors.primary} !important;
    fill: ${({ theme }) => theme.colors.primary} !important;
  }
  & svg:hover {
    color: ${({ theme }) => theme.colors.blue} !important;
    fill: ${({ theme }) => theme.colors.primary} !important;
  }
`;
export const AboutPage = () => {
  const navigate = useNavigate();

  function handlerVK() {
    window.open("https://vk.com/id143051280", '_blank');
  }
  const handlerGitHub = () => {
    window.open("https://github.com/Kittienessless/D_Lingify", '_blank');
  };
  return (
    <Container>
      <Text weight={"bold"} height="m" size={"40px"} centerHorizontally>
        О проекте Lingify{" "}
      </Text>
      <Space height="s" />
      <Card>
        <Text weight={400} size={"18px"}>
          Добро пожаловать в Lingify — уникальное веб-приложение, созданное для
          тех, кто хочет погрузиться в мир языков и творчества! Мы разработали
          Lingify с использованием современных технологий, таких как React,
          TypeScript, Node.js и PostgreSQL, чтобы предоставить вам мощный
          инструмент для создания собственных языков и правил. Наша цель —
          сделать процесс изучения и создания языков увлекательным и доступным
          для всех.
        </Text>
      </Card>

      <div style={{ display: "flex" }}>
        <Card>
          <Text weight={400} size={"18px"}>
            С помощью Lingify вы можете не только создавать свои уникальные
            языки, но и использовать нейронные сети на базе Gigachat для
            автоматического перевода с русского и английского на ваши
            придуманные языки. Это значит, что вы можете легко
            экспериментировать с новыми лексическими структурами и
            грамматическими правилами, а также получать мгновенные переводы,
            которые помогут вам лучше понять, как работает ваш язык.
          </Text>
        </Card>
        <Card>
          <Text weight={400} size={"18px"}>
            Lingify предлагает вам возможность редактировать и дополнять уже
            созданные языки, а также создавать новые языки вручную. Вы можете
            настраивать фонетику, грамматику и словарный запас, чтобы ваш язык
            стал поистине уникальным. Наша команда постоянно работает над
            улучшением приложения, добавляя новые функции и возможности, чтобы
            сделать ваш опыт еще более увлекательным.
          </Text>
        </Card>
      </div>

      <Card>
        <Text weight={400} size={"18px"}>
          С Lingify вы сможете не только развивать свои языковые навыки, но и
          воплощать в жизнь самые смелые идеи.
        </Text>
      </Card>
      <div style={{ display: "flex" }}>
        <Card>
          <Text weight={400} size={"18px"} centerHorizontally>
            Наша почта:{" "}
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
      </div>
    </Container>
  );
};
