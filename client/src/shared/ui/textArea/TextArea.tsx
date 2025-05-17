import React from "react";
import styled from "styled-components";

const Area = styled.textarea`
  resize: none;
  font-size: 16px;
  width: 35em;
  height: auto;
  padding: 12px;
  margin: 15px;
  border-radius: 12px;
  font-family: monaco, sans-serif;
`;

type TextAreaProps = {
  id: number;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  maxlength: number;
  readonly?: boolean;
 };

export const TextArea = ({
  id,
  value, 
  onChange,
  placeholder,
  maxlength,
  readonly,
  ...rest
}: TextAreaProps) => {
  return (
    <Area
      rows={6}  
      placeholder={placeholder}
      value={value}
      maxLength={maxlength}
      onChange={onChange}
      {...rest}
      readOnly={readonly}
    />
  );
};

export default TextArea;
