import { VStack, HStack } from '../../lib/stack'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Button } from '../button'
import { horizontalPadding } from '../../lib/horizontalPadding'
import { verticalPadding } from '../../lib/verticalPadding'
import { BodyPortal } from '../../lib/BodyPortal'
import { ChildrenProp, OnCloseProp } from '../../lib/props'
import { Text } from '../text'
 import { stopPropagation } from '../../lib/stopPropagation.tsx'

import { Backdrop } from './Backdrop'

export type BottomSlideOverProps = ChildrenProp &
  OnCloseProp & {
    title: ReactNode
  }

const Cover = styled(Backdrop)`
  align-items: flex-end;
  justify-content: flex-end;
`

const Container = styled(VStack)`
  width: 100%;
  border-radius: 20px 20px 0 0;
  ${verticalPadding(24)}

  background: #152555;
  max-height: 80%;

  gap: 32px;

  > * {
    ${horizontalPadding(16)}
  }
`

const Content = styled(VStack)`
  flex: 1;
  overflow-y: auto;
`

export const BottomSlideOver = ({
  children,
  onClose,
  title,
}: BottomSlideOverProps) => {
  return (
    <BodyPortal>
      <Cover onClose={onClose}>
        <Container onClick={stopPropagation()}>
          <HStack gap={8} alignItems="center" justifyContent="space-between">
            <Text   as="div" weight="600" size={24}>
              {title}
            </Text>
            <Button   onClick={onClose} >
              Close
            </Button>
          </HStack>
          <Content gap={12}>{children}</Content>
        </Container>
      </Cover>
    </BodyPortal>
  )
}