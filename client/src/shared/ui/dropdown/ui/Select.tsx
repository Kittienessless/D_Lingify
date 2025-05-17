import React, { useState } from "react";
import styles from "./Select.module.css";
import { Option } from "../../../types/Option.tsx";
import { ArrowDownIcon } from "shared/assets/ArrowDownIcon.tsx";
import styled from "styled-components";

interface SelectProps {
  placeholder?: string;
  options: Option[];
  selected: Option | null;
  onChange: (selection: Option) => void;
}

const SelectComponent = styled.div`
  position: relative;
`;

const SelectComp = styled.div`
  background-color: ${({ theme }) => theme.colors.menu};
  color: ${({ theme }) => theme.colors.font};

  display: flex;
  padding: 8px 16px;
  border: 1px solid rgb(220, 220, 238);
  width: 12rem;
  cursor: pointer;
  border-radius: 12px;
  justify-content: space-between;
  margin: 5px;

  & span {
    font-size: 14px;
  }
  & svg {
    fill: ${({ theme }) => theme.colors.font};
  }
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
`;
const Opt = styled.div`
  background-color: ${({ theme }) => theme.colors.menu};
  color: ${({ theme }) => theme.colors.font};
`;

export const Select: React.FC<SelectProps> = ({
  placeholder,
  selected,
  options,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <SelectComponent>
      <SelectComp onClick={() => setShowOptions(!showOptions)}>
        <span>{selected ? selected.label : placeholder}</span>
        <span>
          <ArrowDownIcon />
        </span>
      </SelectComp>
      {showOptions && (
        <Options className={styles["options"]}>
          {options.map((option) => (
            <Opt
              onClick={() => {
                onChange(option);
                setShowOptions(false);
              }}
              key={option.value}
              className={styles["option"]}
            >
              <span>{option.label}</span>
            </Opt>
          ))}
        </Options>
      )}
    </SelectComponent>
  );
};
