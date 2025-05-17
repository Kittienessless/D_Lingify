import react from "react";
import { Text } from "../text";
import styled from "styled-components";
import ImgEmpty from "../../assets/ErrorImage.svg";
import { Space } from "../space";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.font};
`;

const EmptyImg = styled.img.attrs({
  src: ImgEmpty,
})`
  width: 20%;
`;
export const Empty = () => {
  return (
    <Container>
      <EmptyImg />
      <Text weight={"bold"} height="m" size={"28px"} centerHorizontally>
        Похоже, никаких результатов!
      </Text>
      <Space height="s" />
      <Text weight={400} height="s" size={"18px"} centerHorizontally>
        Создайте язык!
      </Text>
    </Container>
  );
};
