import { AdminDashBoard } from "features/administration/ui/AdminDashBoard";
import react from "react";
import styled from "styled-components";
import { AdministrationCart } from "widgets/administrationWidget";
const Container = styled.div`
  margin: 10px;
  position: relative;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 50vw;
  background:  ${({ theme }) => theme.colors.bg  };
  color: ${({ theme }) => theme.colors.font  };
  `;
export const AdminPage = () => {
  return (
    <Container>
      <AdministrationCart />
    </Container>
  );
};
