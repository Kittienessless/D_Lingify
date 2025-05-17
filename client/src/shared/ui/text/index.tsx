import styled, { DefaultTheme, css } from "styled-components";

import React from "react";

type TextColor = "primary" | "secondary" | "link" | "none";

type TextHeight = "s" | "m" | "l" | "xl";
const lineHeight: Record<TextHeight, number> = {
  s: 1,
  m: 1.2,
  l: 1.5,
  xl: 1.75,
};

export interface TextProps {
  weight?: React.CSSProperties["fontWeight"];
  size?: React.CSSProperties["fontSize"];
  height?: TextHeight;
  centerHorizontally?: boolean;
  centerVertically?:
    | boolean
    | {
        gap: number;
      };
  cropped?: boolean;
  nowrap?: boolean;
  blurBackground?: boolean;
}
export const text = ({
  weight,
  size,
  height,
  centerHorizontally,
  centerVertically,
  nowrap,
  blurBackground,
}: TextProps) => css`
  overflow-wrap: break-word;
  text-wrap: pretty;

  overflow: hidden;
  color: ${({ theme }) => theme.colors.font}
    ${weight &&
    css`
      font-weight: ${weight};
    `}
    ${height &&
    css`
      line-height: ${lineHeight[height]};
    `}
    ${centerHorizontally &&
    css`
      text-align: center;
    `}
    ${nowrap &&
    css`
      white-space: nowrap;
    `}
    ${size &&
    css`
      font-size: ${size};
    `}
    ${centerVertically &&
    css`
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
    `}
    ${blurBackground &&
    css`
      position: relative;

      &:before {
        content: "";
        z-index: -1;
        pointer-events: none;
        backdrop-filter: blur(100px);
      }
    `};
`;

export const Text = styled.p<TextProps>`
  ${text}
`;
