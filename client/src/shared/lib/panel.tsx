import { match } from './match'
import styled, { css } from 'styled-components'

import { borderRadius } from './borderRadius'
import { toSizeUnit } from './toSizeUnit'
 
type PanelKind = 'regular' | 'secondary'

export interface PanelProps {
  padding?: React.CSSProperties['padding']
  direction?: React.CSSProperties['flexDirection']

  kind?: PanelKind

  withSections?: boolean
}

export const panelDefaultPadding = 20

export const panel = ({
  padding = panelDefaultPadding,
  direction = 'column',
  kind = 'regular',
  withSections = false,
}: PanelProps = {}) => {
  return css`
    ${borderRadius.m};

    overflow: hidden;

    ${({ theme }) => {
      const contentBackground = match(kind, {
        secondary: () => 'D4D0FF',
        regular: () => '#D0D0D0',
      })

      const content = css`
        padding: ${toSizeUnit(padding)};
        background: ${contentBackground};
      `

      if (!withSections) {
        return content
      }

      return css`
        display: flex;
        flex-direction: ${direction};

        ${kind === 'secondary'
          ? css`
              background: #00df33;
              gap: 2px;
            `
          : css`
              gap: 1px;
            `}

        > * {
          ${content}
        }
      `
    }}

    ${kind === 'secondary' &&
    css`
      border: 2px solid  #00df33;
    `}
  `
}

export const Panel = styled.div<PanelProps>`
  ${panel}
`