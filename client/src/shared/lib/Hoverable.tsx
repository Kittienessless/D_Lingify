import { ComponentProps } from 'react'
import styled from 'styled-components'

import { UnstyledButton } from '../ui/button/UnstyledButton.tsx'
import { absoluteOutline } from './absoluteOutline.tsx'
import { borderRadius } from './borderRadius'

interface HighlightProps {
  horizontalOffset: number | string
  verticalOffset: number | string
}

const Highlight = styled.div<HighlightProps>`
  position: absolute;
  ${borderRadius.s};
  ${(props) => absoluteOutline(props.horizontalOffset, props.verticalOffset)}
`

const Container = styled(UnstyledButton)`
  position: relative;

  outline: none;

  &:hover ${Highlight} {
    background: '#d0d0d0';
  }
`

const Content = styled.div`
  z-index: 1;
`

type HoverableProps = ComponentProps<typeof Container> &
  Partial<HighlightProps> & {
    as?: React.ElementType
  }

export const Hoverable = ({
  children,
  horizontalOffset = 8,
  verticalOffset = 8,
  ...rest
}: HoverableProps) => {
  return (
    <Container {...rest}>
      <Highlight
        verticalOffset={verticalOffset}
        horizontalOffset={horizontalOffset}
      />
      <Content>{children}</Content>
    </Container>
  )
}