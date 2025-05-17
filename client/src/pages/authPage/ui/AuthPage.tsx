import styled from "styled-components";
import { Layout } from 'antd';
 import {LoginWidget} from "widgets/loginWidget";

const Container = styled.div`
   background-color: ${({ theme }) => theme.colors.bg};
  & svg{
    color: black !important;
  }
 `

export  const AuthPage =()=> {

  return(
    <Layout>
      
      <Container> 
        <LoginWidget></LoginWidget>
        
      </Container>
    </Layout>

  );
}