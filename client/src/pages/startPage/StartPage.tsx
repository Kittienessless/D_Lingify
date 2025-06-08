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
import { withTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const Container = styled.div`
  background: linear-gradient(
    to top,
    #fff1eb 0%,
    rgb(124, 214, 255) 70%,
    rgb(94, 204, 255) 100%
  );
`;

const Landing = styled.div`
  width: 100%;
  padding: 10rem;
  color: ${({ theme }) => theme.colors.fontContrast};
`;
const CardContainer = styled.div`
  width: 100%;
  ${centerContent};
  color: ${({ theme }) => theme.colors.font};
`;

const ImageContainer = styled.div`
  color: ${({ theme }) => theme.colors.font};
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 80%;
  text-align: left;
  position: relative;
  ${centerContent};
  height: auto;
  margin-right: 3em;
  padding: 1em;
`;
const Image = styled.img`
  opacity: 0.9;
  width: 30%;
  height: auto;
  margin-left: 5em;
`;
const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 2em;
  padding: 1em;
  max-width: 18em;
  height: 18em;
`;
const CardWelcome = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  margin: 4em;
  padding: 4em;
  max-width: fit-content;
  height: auto;
`;
const HandbookContainer = styled.div`
  width: 100%;
  height: 30vh;
  padding: 10rem;
  ${centerContent};
    color:rgb(39, 39, 39);
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
  return (
    <Container>
      <Landing>
        <Text height="m" size={"42px"}>
      
         <Trans>Добро пожаловать в Lingify</Trans>
        </Text>
        <Text height="m" size={"38px"}>
          Ваш инструмент для создания уникальных искусственных языков!
        </Text>
        <Space height="s"></Space>
        {!store.isAuth && (
          <>
            <Text height="m" size={"24px"}>
              Войди или зарегистрируйся чтобы создать свой уникальный язык
            </Text>
            <Space height="s"></Space>
            <div style={{ display: "flex" }}>
              <Button primary onClick={handlerClick}>
                Зарегистрироваться
              </Button>
              <Button onClick={handlerClick1}>Войти</Button>
            </div>
          </>
        )}
      </Landing>

      <ImageContainer>
        <CardWelcome>
          <Text height="m" size={"20px"}>
            Создавайте собственные языки легко и быстро с помощью передовых
            нейросетевых технологий. Наше приложение позволяет не только
            генерировать новые языки, но и редактировать их, переводить тексты и
            управлять своим языковым портфолио.
          </Text>
        </CardWelcome>

        <Image src={image}></Image>
      </ImageContainer>
      <Space height="s"></Space>

      <CardContainer>
        <Card>
          <Text height="m" size={"24px"}>
            Нейросети
          </Text>
          <Divider></Divider>
          <Text height="s" size={"16px"}>
            Нейросети берут на себя большую часть монотонной работы, позволяя
            уделить время более важным вещам
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            Исследования
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            Лингвистические исследования в области языкознания, конструирование
            новых и реконструирование утерянных языков
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            Cкорость работы
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            Веб-приложение позволяет оптимизировать время разработки конлангов
            за счет мастера создания языков и редактора
          </Text>
        </Card>
        <Card>
          <Text height="m" size={"24px"}>
            ЦИИ НГУ
          </Text>
          <Divider></Divider>

          <Text height="s" size={"16px"}>
            Разработка ведется в рамках заказа от ЦИИ НГУ для филологического и
            журналистского факультетов.
          </Text>
        </Card>
      </CardContainer>
      <HandbookContainer>
        <Text height="m" size={"26px"}>
          Узнайте о возможностях веб-приложения Lingify в{" "}
          <a href="http://localhost:3000/Handbook#/Handbook">руководстве</a>
        </Text>
        <Space height="s"></Space>
      </HandbookContainer>
    </Container>
  );
};

export default observer(StartPage);
