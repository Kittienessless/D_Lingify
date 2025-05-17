import React, { Ref } from "react";
import styled, { css } from "styled-components";

import { transition } from "../../lib/transition.tsx";
import { UnstyledButton } from "./UnstyledButton.tsx";
import { AsProp } from "shared/lib/props.tsx";
import { CenterAbsolutely } from "shared/lib/CenterAbsolutely.tsx";
import { Loader } from "../loaders/loader.tsx";
import { MergeRefs } from "shared/lib/MergeRefs.tsx";
import { Tooltip } from "../tooltip/index.tsx";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  primary?: boolean;
};

interface ContainerProps {
  primary?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRounded?: boolean;
}
const StyledButton = styled(UnstyledButton)<ContainerProps>`
  background-color: ${(props) => (props.primary ? "#0091FF" : "white")};
  color: ${(props) => (props.primary ? "white" : "#0091FF")};
  ${transition};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.6;
      & :hover {
        cursor: 'initial';
      }
    `};
  text-wrap: nowrap;
  width: fit-content;
  height: 3em;
  font-size: 16px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0091ff;
  border-radius: 7px;
  &:hover {
    cursor:${(props) =>
      props.isDisabled ? "initial" : "pointer"} ;
    background-color: ${(props) =>(
      props.isDisabled ? 'none' : props.primary ? "rgb(50, 164, 252)" : "rgb(242, 250, 253)"  
       )};
  }

 
`;

export type ButtonProps = Omit<
  React.ComponentProps<typeof StyledButton>,
    'isDisabled'
> & {
   
  isDisabled?: boolean | string
  isLoading?: boolean
  isRounded?: boolean
   
  onClick?: () => void
  ref?: Ref<HTMLButtonElement>
} & AsProp
const Hide = styled.div`
  opacity: 0;
`
export function Button({
  children,
  primary,
  isDisabled = false,
  isLoading = false,
  onClick,
  ref,
  ...rest
}: ButtonProps)  { 
  const content = isLoading ? (
    <>
      <Hide>{children}</Hide>
      <CenterAbsolutely>
        <Loader />
      </CenterAbsolutely>
    </>
  ) : (
    children
  )
  const containerProps = {
    primary,
    isDisabled: !!isDisabled,
    isLoading,
    onClick: isDisabled || isLoading ? undefined : onClick,
    ...rest,
  }

  if (typeof isDisabled === 'string') {
    return (
      <Tooltip
        content={isDisabled}
        renderOpener={({ ref: tooltipRef, ...tooltipRest }) => (
          <MergeRefs
            refs={[ref, tooltipRef]}
            render={(ref) => (
              <StyledButton ref={ref} {...containerProps} {...tooltipRest}>
                {content}
              </StyledButton>
            )}
          />
        )}
      />
    )
  }

  return (
    <StyledButton  ref={ref} {...containerProps}>
      {content}
    </StyledButton>
  )
}
  
 
 