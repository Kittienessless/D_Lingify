import { UserContext } from "app/providers";
import { AdminDashBoard } from "features/administration/ui/AdminDashBoard";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AdministrationCart } from "widgets/administrationWidget";
import { Text } from "shared/ui/text";

const Container = styled.div`
  margin: 10px;
  position: relative;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 90vw;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.font};
`;
const AdminPage: React.FC = () => {
  const { store } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    
  }, [store.isAuth, store.isAdmin]);

  return (
    <Container>
      {!store.isAuth && <>
      <Text>Auth Error</Text>
      </>}
      {store.isAuth && store.isAdmin &&  <AdministrationCart />}
      
    </Container>
  );
};

export default observer(AdminPage);
