import { Space } from "shared/ui/space";
import styled from "styled-components";
import { Button } from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import image from "../../shared/assets/production_files_c8188ba8-bfd4-4702-ac01-9244c9689064 копия.png";
import { Text } from "shared/ui/text";
import { borderRadius } from "shared/lib/borderRadius";
import { centerContent } from "shared/lib/centerContent";
import { ArrowRightIcon } from "shared/assets/ArrowRightIcon";
import { interactive } from "shared/lib/interactive";
import { IconButton } from "shared/ui/button/IconButton";
import { Divider } from "shared/ui/divider";
import { observer } from "mobx-react-lite";
import { UserContext } from "app/providers";
import { FC, useContext, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Screen1 from "../../shared/assets/123 (1).png";
import Screen2 from "../../shared/assets/123 (2).png";
const Container = styled.div`
  background: linear-gradient(
    to top,
    #fff1eb 0%,
    rgb(124, 214, 255) 70%,
    rgb(94, 204, 255) 100%
  );
  @media (width <= 1350px) {
    margin: 0 auto;
  }
`;

const Landing = styled.div`
  width: 100%;

  padding: 10em;
  color: ${({ theme }) => theme.colors.fontContrast};
  @media (width <= 1350px) {
    font-size: 1.2rem !important;
    margin: 0 auto;
    width: 100vw;
    padding: 5em;
  }
`;
const CardContainer = styled.div`
  width: 100%;
  ${centerContent};
  color: ${({ theme }) => theme.colors.font};
  @media (width <= 1350px) {
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
`;

const ImageContainer = styled.div`
  color: ${({ theme }) => theme.colors.font};
  margin: 0 auto;
  ${centerContent};
  height: auto;
  margin-right: 3em;
  padding: 1em;

  @media (width <= 1350px) {
    flex-direction: column;
    width: 100vw;
    margin-top: 4em;
    margin-right: 0;
  }
`;
const Image = styled.img`
  opacity: 0.9;
  width: 30%;
  height: auto;
  margin-left: 5em;
  @media (width <= 1350px) {
    width: 50%;
    margin-left: 0;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 2em;
  padding: 1em;
  max-width: 18em;
  height: 18em;
  @media (width <= 1350px) {
       margin: .5em;
max-width: 30em;
  height: 10em;
    padding: 0.9em;
  }
`;
const CardWelcome = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 4em;
  padding: 4em;
  max-width: fit-content;
  height: auto;
  @media (width <= 1350px) {
    width: 100%;
    height: 100%;
    margin-top: 4em;
    margin: 1em;
  }
`;
const HandbookContainer = styled.div`
  width: 100%;
  height: 30vh;
  padding: 10rem;
  ${centerContent};
  color: rgb(39, 39, 39);
`;

const Screen = styled.div`
  display: flex;
 
  @media (width <= 170px) {
    flex-direction: column;
  }
`;
const Images = styled.div`
  width: 90%;
   @media (width <= 170px) {
    flex-direction: column;
  }
`;
const StartPage: FC = () => {
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store.isAuth]);

  function handlerClick() {
    navigate("Auth/register");
  }
  function handlerClick1() {
    navigate("Auth");
  }
  const { t } = useTranslation();

  return (
    <Container>
      <Landing>
        <Text height="m" size={"42px"}>
          {t("main.header")}
        </Text>
        <Screen>
          <Text height="m" size={"38px"}>
            {t("main.header2")}
          </Text>
         {/*  <Images>
            <ImageScreen1 src={Screen1}></ImageScreen1>
            <ImageScreen2 src={Screen2}></ImageScreen2>
          </Images> */}
        </Screen>

        {!store.isAuth && (
          <>
            <Text height="m" size={"24px"}>
              {t("main.header3")}
            </Text>

            <Space height="s"></Space>
            <div style={{ display: "flex" }}>
              <Button primary onClick={handlerClick}>
                {t("main.buttonRegister")}
              </Button>
              <Button onClick={handlerClick1}> {t("main.buttonSighIn")}</Button>
            </div>
          </>
        )}
      </Landing>

      <ImageContainer>
        <CardWelcome>
          <Text height="m" size={"20px"}>
            {t("main.about")}
          </Text>
        </CardWelcome>

        <Image src={image}></Image>
      </ImageContainer>
      <Space height="s"></Space>

      <CardContainer>
        <Card>
          <Text height="m" size={"24px"}>
            {t("main.neural")}
          </Text>
          <Divider></Divider>
          <Text height="s" size={"16px"}>
            {t("main.neuralAbout")}
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            {t("main.research")}
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            {t("main.researchAbout")}
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            {t("main.fast")}
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            {t("main.fastAbout")}
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            {t("main.nsu")}
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            {t("main.nsuAbout")}
          </Text>
        </Card>
      </CardContainer>
      <HandbookContainer>
        <Text height="m" size={"26px"}>
          {t("main.handbook1")}
          <a href="http://localhost:3000/Handbook#/Handbook">
            {t("main.handbook2")}
          </a>
        </Text>
        <Space height="s"></Space>
      </HandbookContainer>
    </Container>
  );
};

export default observer(StartPage);
