import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import FocusLock from 'react-focus-lock'
import styled, { css } from 'styled-components'

import { borderRadius } from '../../lib/borderRadius'
import { vStack } from '../../lib/stack'
import { takeWholeSpace } from '../../lib/takeWholeSpace'
import { toSizeUnit } from '../../lib/toSizeUnit.tsx'
import { useIsScreenWidthLessThan } from '../../lib/hook/useIsScreenWidthLessThan'
 
import { modalConfig } from './config.ts'

export type ModalPlacement = 'top' | 'center'

type ContainerProps = {
  width?: number
  placement: ModalPlacement
}

const offset = 40

const Container = styled(FocusLock)<ContainerProps>`
  ${vStack()};

  max-height: 100%;
  background: ${({theme}) => theme.colors.menu};
  color: ${({theme}) => theme.colors.font};

  ${({ width, placement }) =>
    width
      ? css`
          width: ${toSizeUnit(width)};
          ${borderRadius.m};
          max-height: calc(100% - ${toSizeUnit(offset * 2)});
          
          ${placement === 'top' &&
          css`
            align-self: start;
            margin-top: ${toSizeUnit(offset)};
          `}
        `
      : takeWholeSpace};

  border: 1px solid rgb(146, 146, 146);
  overflow: hidden;
`

type ModalContainerProps = {
  targetWidth?: number
  placement?: ModalPlacement
  as?: ElementType
} & Omit<
  ComponentPropsWithoutRef<ElementType>,
  keyof ContainerProps | 'as' | 'width' | 'placement'
>

export function ModalContainer({
  targetWidth = 400,
  placement = 'center',
  as,
  ...props
}: ModalContainerProps) {
  const isFullScreen = useIsScreenWidthLessThan(
    targetWidth + modalConfig.minHorizontalFreeSpaceForMist,
  )

  return (
    <Container
      returnFocus
      as={as}
      width={isFullScreen ? undefined : targetWidth}
      placement={placement}
      {...props}
    />
  )
}