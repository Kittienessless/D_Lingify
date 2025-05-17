import styled from "styled-components";

import { ArticleWidget } from "widgets/articleWidget";
const Container = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.font};
  margin: 10px;
  position: relative;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  max-width: 80vw;
  min-width: 20vw;

`;

export const HandbookPage = () => {
  return (
    <Container>
      <ArticleWidget />
    </Container>
  );
};
