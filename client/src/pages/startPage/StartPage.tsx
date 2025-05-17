import { Space } from "shared/ui/space";
import styled from "styled-components";
import { Button } from "shared/ui/button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Landing = styled.div`
  width: 100%;
  height: 30vh;
  margin: 10px;
  padding: 5px;
`;
const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
`;

const Card = styled.div``;

export const StartPage = () => {
  const navigate = useNavigate();

  function handlerClick() {
    navigate("Auth/register");
  }

  return (
    <Container>
      <Landing>
        {/*  picture  */}

        {/*  Тест + кнопка        */}
        <Button   primary onClick={handlerClick}>
          Попробовать
        </Button>
      </Landing>
      <Space height={"s"} />
      <CardContainer>
        <Card>{/* функции и возможности веб приложения */}</Card>
      </CardContainer>
      {/* несколько картинок основного функционала приложения - скриншотов */}
    </Container>
  );
};
