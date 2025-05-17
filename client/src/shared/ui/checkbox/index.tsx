import { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  InvisibleHTMLCheckboxProps,
  InvisibleHTMLCheckbox,
} from "./InvisibleHTMLCheckbox.tsx";
import { centerContent } from "../../lib/centerContent";
import { sameDimensions } from "../../lib/sameDimensions.tsx";
import { transition } from "../../lib/transition";
import { CheckIcon } from "../../assets/CheckIcon";
import { HStack } from "../../lib/stack.tsx";
import { Text } from "../text";
import { interactive } from "../../lib/interactive.tsx";

interface CheckboxProps extends InvisibleHTMLCheckboxProps {
  label?: ReactNode;
  className?: string;
}

const Box = styled.div<{ isChecked: boolean }>`
  ${sameDimensions(28)}
  ${centerContent};
  border-radius: 5px;
  border: ${({ theme }) => theme.border.color};
  ${transition}
  ${({ isChecked }) =>
    isChecked &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.fontContrast};
    `};
`;

const Container = styled(HStack)`
  color: ${({ theme }) => theme.colors.font};
  ${interactive}
  position: relative;
  ${transition}

  font-weight: 500;
  & :hover ${Box} {
    transform: scale(1.1);
  }
`;

export const Checkbox = ({
  value,
  onChange,
  label,
  className,
}: CheckboxProps) => (
  <Container className={className} as="label" alignItems="center" gap={12}>
    <Box isChecked={value}>{value && <CheckIcon />}</Box>
    {label && (
      <Text style={{ transition: "none" }} as="div">
        {label}
      </Text>
    )}
    <InvisibleHTMLCheckbox value={value} onChange={onChange} />
  </Container>
);
