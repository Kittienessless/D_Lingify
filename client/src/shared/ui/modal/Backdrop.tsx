import React, { ComponentProps, useRef } from 'react'
import styled from 'styled-components'

import { centerContent } from '../../lib/centerContent.tsx'
import { takeWholeSpace } from '../../lib/takeWholeSpace.tsx'
import { useKeyDown } from '../../lib/hook/useKeyDown.tsx'
import { OnCloseProp } from '../../lib/props.tsx'

const Container = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  ${takeWholeSpace};
  ${centerContent};
  background: rgb(212, 212, 212, 0.1);
  backdrop-filter: blur(4px);
`

export const Backdrop = ({
  onClose,
  ...props
}: Partial<OnCloseProp> & ComponentProps<typeof Container>) => {
  const isPointerDownInside = useRef(false)
  useKeyDown('Escape', onClose)

  return (
    <Container
      onPointerDown={({ target, currentTarget }) => {
        if (target === currentTarget) {
          isPointerDownInside.current = true
        }
      }}
      onPointerUp={() => {
        if (isPointerDownInside.current) {
          onClose?.()
        }
        isPointerDownInside.current = false
      }}
      onPointerCancel={() => {
        isPointerDownInside.current = false
      }}
      {...props}
    />
  )
}