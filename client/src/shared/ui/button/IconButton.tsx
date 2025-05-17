import { match } from "../../lib/match.ts";
import { ComponentProps } from "react";
import styled, { css } from "styled-components";

import { MergeRefs } from "../../lib/MergeRefs";
import { borderRadius } from "../../lib/borderRadius";
import { centerContent } from "../../lib/centerContent";
import { interactive } from "../../lib/interactive";
import { sameDimensions } from "../../lib/sameDimensions";
import { toSizeUnit } from "../../lib/toSizeUnit.tsx";

import { Tooltip } from "../tooltip";
import { UnstyledButton } from "./UnstyledButton";

export const iconButtonSizes = ["s", "m", "l"] as const;
export type IconButtonSize = (typeof iconButtonSizes)[number];

export const iconButtonSizeRecord: Record<IconButtonSize, number> = {
  s: 24,
  m: 32,
  l: 40,
};

export const iconButtonIconSizeRecord: Record<IconButtonSize, number> = {
  s: 14,
  m: 14,
  l: 16,
};

type IconButtonContainerParams = {
  size?: IconButtonSize;
  isDisabled?: boolean;
};

export const iconButtonContainer = ({
  size = "m",
  isDisabled = false,
}: IconButtonContainerParams) => css`
  ${interactive};
  position: relative;
  ${centerContent};
  ${sameDimensions(iconButtonSizeRecord[size])};
  background: transparent;
  color: black;

  font-size: ${toSizeUnit(iconButtonIconSizeRecord[size])};

  ${borderRadius.s};

  cursor: ${isDisabled ? "initial" : "pointer"};
  opacity: ${isDisabled ? 0.8 : 1};
`;

const Container = styled(UnstyledButton)<IconButtonContainerParams>`
  ${iconButtonContainer};
`;

export type IconButtonProps = Omit<
  ComponentProps<typeof Container>,
  "isDisabled"
> & {
  icon: React.ReactNode;
  size?: IconButtonSize;
  title: string;
  as?: React.ElementType;
  isDisabled?: boolean | string;
};

export function IconButton({
  icon,
  isDisabled = false,
  onClick,
  ...rest
}: IconButtonProps) {
  const containerProps = {
    isDisabled: !!isDisabled,
    onClick: isDisabled ? undefined : onClick,
    ...rest,
  };

  const buttonContent = <Container {...containerProps}>{icon}</Container>;

  if (typeof isDisabled === "string") {
    return (
      <Tooltip
        content={isDisabled}
        renderOpener={({ ref: tooltipRef, ...tooltipRest }) => (
          <MergeRefs
            refs={[rest.ref, tooltipRef]}
            render={(mergedRef) => (
              <Container ref={mergedRef} {...containerProps} {...tooltipRest}>
                {icon}
              </Container>
            )}
          />
        )}
      />
    );
  }

  return buttonContent;
}
