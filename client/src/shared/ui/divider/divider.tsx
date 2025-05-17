import React  from "react";
import styled from 'styled-components'
type Props = {
  className?: string;
  children?: React.ReactNode;
 }
const Container = styled.div`
 display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
`
const Border = styled.div`
 border-bottom: 1px solid rgb(202, 202, 202);
  width: 100%;
`



export const Divider = ({ className,  ...restTooltipProps } : Props) => {
  return (
    <Container    {...restTooltipProps}>
      <Border />
       <Border  />
    </Container>
  );
};