import React from 'react';
 import styled from 'styled-components'
 type Props = {
   
   children?: React.ReactNode;
   onChange? :(event: any) => void;
  }
const InputWrapper = styled.label`
 position: relative;
`;
const Input = styled.input`
  position: absolute;
  left: -999999999px;
  right: -999999999px;

    &:checked + span{
      background-color:rgb(223, 238, 252);

      &:before{
        left: calc( 100% - 2px );
        transform: translateX(-100%);
      }
    }

    &:focus + span {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); 
    }
    &:focus:checked + span {
      box-shadow: 0 0 0 2px rgba(116, 185, 250, 0.8); 
  }
`;
 
const Slider = styled.span`
display: flex;
cursor: pointer;
width: 50px;
height: 25px;
border-radius: 100px;
background-color: #bfbfbf;
position: relative;
transition: background-color 0.2s, box-shadow 0.2s;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 35, 11, 0.2);
  }

  &:active:before {
    width: 28px;
  }
`;

export const Switch = ({ children, onChange,  ...restTooltipProps} : Props) => {
  return (
    <InputWrapper   >
      <Input   
      type='checkbox'
      {...restTooltipProps}
      onChange={onChange}
      /> 
      <Slider   />
    </InputWrapper>
  );
};