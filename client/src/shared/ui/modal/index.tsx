import { HStack, VStack } from '../../lib/stack.tsx'
import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

import { toSizeUnit } from '../../lib/toSizeUnit.tsx'
import { BodyPortal } from '../../lib/BodyPortal'
import { AsProp, TitleProp } from '../../lib/props'

import { Backdrop } from './Backdrop'
import { modalConfig } from './config.ts'
import { ModalCloseButton } from './ModalCloseButton.tsx'
import { ModalContainer, ModalPlacement } from './ModalContainer.tsx'
import { ModalSubTitleText } from './ModalSubTitleText'
import { ModalTitleText } from './ModalTitleText.tsx'

export type ModalProps = AsProp &
  Omit<ComponentProps<typeof Container>, 'title'> &
  TitleProp & {
    onClose?: () => void
    subTitle?: ReactNode
    placement?: ModalPlacement
    footer?: ReactNode
    targetWidth?: number
  }

const contentVerticalPadding = 8

const Container = styled(ModalContainer)`
  > * {
    padding: ${toSizeUnit(modalConfig.padding)};
    
  }

  > *:nth-child(2) {
    padding-top: ${toSizeUnit(contentVerticalPadding)};
  }

  > *:not(:first-child):not(:last-child) {
    padding-bottom: ${toSizeUnit(contentVerticalPadding)};
  }
`

export const Modal = ({
  title,
  children,
  onClose,
  footer,
  subTitle,
  as,
  ...rest
}: ModalProps) => {
  return (
    <BodyPortal>
      <Backdrop onClose={onClose}>
        <Container forwardedAs={as} {...rest}>
          <VStack gap={8}>
            <HStack alignItems="start" justifyContent="space-between" gap={16}>
              <ModalTitleText>{title}</ModalTitleText>
              {onClose && <ModalCloseButton onClick={onClose} />}
            </HStack>
            {subTitle && <ModalSubTitleText>{subTitle}</ModalSubTitleText>}
          </VStack>
          {children}
          {footer && <VStack>{footer}</VStack>}
        </Container>
      </Backdrop>
    </BodyPortal>
  )
}