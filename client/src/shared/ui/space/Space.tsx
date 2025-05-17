import styled, { css } from "styled-components";

type SpaceHeight = "s" | "m" | "l" | "xl";
const SpaceSize: Record<SpaceHeight, string> = {
  s: "20px",
  m: "40px",
  l: "60px",
  xl: "70px",
};

export interface SpaceProps {
  height?: SpaceHeight;
}

export const Empty = ({ height }: SpaceProps) => css`
  ${height &&
  css`
    height: ${SpaceSize[height]};
  `}
`;

export const Space = styled.div<SpaceProps>`
  ${Empty}
`;
