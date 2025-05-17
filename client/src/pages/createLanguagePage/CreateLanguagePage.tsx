import styled from "styled-components";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely";
import { LanguageWidget } from "widgets/languageWidget/ui/LanguageWidget";
import { centerContent } from "shared/lib/centerContent";
import { CreateLangWidget } from "widgets/languageWidget/ui/CreateLangWidget";
const Container = styled.div`
  ${centerContent};

  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.bg};
 
`;

export const CreateLanguagePage = () => {
  return (
    <Container>
      <CreateLangWidget />
    </Container>
  );
};
