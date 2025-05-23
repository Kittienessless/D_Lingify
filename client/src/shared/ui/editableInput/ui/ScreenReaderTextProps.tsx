import { HTMLAttributes, memo } from "react";
import styled from "styled-components";

interface ScreenReaderTextProps extends HTMLAttributes<HTMLSpanElement> {
    children: string;
}

const Screen = styled.span`
  position: fixed;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(100%);
`

export const ScreenReaderText = memo((props: ScreenReaderTextProps) => (
    <Screen {...props}>
        {props.children}
    </Screen>
))