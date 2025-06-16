import React from "react";
import { borderRadius } from "shared/lib/borderRadius";
import { Divider } from "shared/ui/divider";
import { Space } from "shared/ui/space";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import Girl1 from "../../../shared/assets/G1.svg";
import Girl2 from "../../../shared/assets/GIRL2.svg";
import Girl3 from "../../../shared/assets/business-person-with-a-resolved-expression-svgrepo-com.svg";
import Girl4 from "../../../shared/assets/sad.svg";
import Girl5 from "../../../shared/assets/a-woman-who-uses-a-computer-negative-svgrepo-com.svg";
import Girl6 from "../../../shared/assets/happy-woman-svgrepo-com.svg";
import { Link, Element } from "react-scroll";
import ShowMore from "shared/ui/showMore/ShowMore";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (width <= 1350px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
  width: 80%;
  height: 100%;
  margin-left: 5em;
  @media (width <= 1350px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ImageCard = styled.img`
  max-width: 15%;

  @media (width <= 1350px) {
    max-width: 10%;
  }
`;
const Menu = styled.div`
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  min-width: 15em;
  text-wrap: wrap;
  padding: 2em;
  margin: 3em;
  height: 100%;
  @media (width <= 1350px) {
    width: 100%;
    margin: 0;
    margin-bottom: 1em;
  }
  & :hover {
    cursor: pointer;
  }
`;
export const ArticleWidget: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text weight={"bold"} height="m" size={"40px"} centerHorizontally>
        {t("handbook.title1")}
      </Text>
      <Space height="s" />
      <Divider></Divider>
      <Space height="s" />
      <Container>
        <Menu>
          <ul>
            <li>
              <Link to="section1" smooth={true} duration={500}>
                Создание языка
              </Link>
            </li>
            <li>
              <Link to="section2" smooth={true} duration={500}>
                Редактирование языка
              </Link>{" "}
            </li>
            <li>
              <Link to="section3" smooth={true} duration={500}>
                Создание языка с помощью нейронных сетей
              </Link>{" "}
            </li>
            <li>
              <Link to="section4" smooth={true} duration={500}>
                Управление языками
              </Link>{" "}
            </li>
            <li>
              <Link to="section5" smooth={true} duration={500}>
                Управление аккаунтом
              </Link>{" "}
            </li>
            <li>
              <Link to="section6" smooth={true} duration={500}>
                Настройки сайта
              </Link>{" "}
            </li>
          </ul>
        </Menu>

        <div>
          <Element name="section1">
            <ShowMore
              text={t("handbook.section1")}
              FullText={t("handbook.handbook1")}
              src={Girl1}
            />
          </Element>
          <Element name="section2">
            <ShowMore
              text={t("handbook.section2")}
              FullText={t("handbook.handbook2")}
              src={Girl2}
            />
          </Element>
          <Element name="section3">
            <ShowMore
              text={t("handbook.section3")}
              FullText={t("handbook.handbook3")}
              src={Girl3}
            />
          </Element>
          <Element name="section4">
            <ShowMore
              text={t("handbook.section4")}
              FullText={t("handbook.handbook4")}
              src={Girl4}
            />
          </Element>
          <Element name="section5">
            <ShowMore
              text={t("handbook.section5")}
              FullText={t("handbook.handbook5")}
              src={Girl5}
            />
          </Element>
          <Element name="section6">
            <ShowMore
              text={t("handbook.section6")}
              FullText={t("handbook.handbook6")}
              src={Girl5}
            />
          </Element>
        </div>
      </Container>
    </>
  );
};
