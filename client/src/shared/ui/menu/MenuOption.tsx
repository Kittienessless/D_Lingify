import { HStack } from '../../lib/stack'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Hoverable } from '../../lib/Hoverable'
import { Button } from '../button'
import { absoluteOutline } from '../../lib/absoluteOutline.tsx'
import { borderRadius } from '../../lib/borderRadius'
import { round } from '../../lib/round.tsx'
import { transition } from '../../lib/transition'
import { verticalPadding } from '../../lib/verticalPadding.tsx'
import { Text } from '../text'
 
import { MenuView } from '.'





type MenuOptionKind = 'regular' | 'alert'

export interface MenuOptionProps {
  icon?: ReactNode
  text: string
  isSelected?: boolean
  onSelect: () => void
  kind?: MenuOptionKind
  view?: MenuView
}

interface ContentProps {
  kind: MenuOptionKind
}

const Content = styled(HStack)<ContentProps>`
  ${transition};
  ${borderRadius.s}
  width: 100%;
  ${verticalPadding(8)};
  align-items: center;
  gap: 12px;
   ${({ kind }) =>
    ({
      regular: css`
        color: ${({ theme }) => theme.colors.font};
      `,
      alert: css`
        color: 'red';
      `,
    })[kind]};

`

const Outline = styled.div`
  ${absoluteOutline(1, 1)};
  border: 2px solid black;
  ${round};
`

export const MenuOption = ({
  text,
  icon,
  onSelect,
  isSelected,
  kind = 'regular',
  view = 'popover',
}: MenuOptionProps) => {
  if (view === 'popover') {
    return (
      <Hoverable verticalOffset={1} onClick={onSelect}>
        <Content kind={kind}>
          <Text style={{ display: 'flex' }}>{icon}</Text>
          <Text>{text}</Text>
        </Content>
      </Hoverable>
    )
  }

  return (
    <Button 
      onClick={onSelect}
    >
      <HStack alignItems="center" gap={8}>
        {icon} <Text>{text}</Text>
      </HStack>
      {isSelected && <Outline />}
    </Button>
  )
}