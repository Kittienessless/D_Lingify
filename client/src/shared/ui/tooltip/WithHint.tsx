import { HStack } from '../../lib/stack'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { horizontalPadding } from '../../lib/horizontalPadding'
import { HelpCircleIcon } from '../../assets/HelpCircleIcon'
import { IconWrapper } from '../../assets/IconWrapper'
import { ChildrenProp } from '../../lib/props'

import { Tooltip } from '.'
import { borderRadius } from 'shared/lib/borderRadius'

interface WithHintProps extends ChildrenProp {
  hint?: ReactNode
   
}

const Container = styled(IconWrapper)`
  ${horizontalPadding(4)};
  
`

export const WithHint = ({ children, hint }: WithHintProps) => {
  return (
    <HStack alignItems="center">
      {children}
      {hint && (
        <Tooltip
          placement="top"
          content={hint}
          renderOpener={(props) => (
            <Container {...props}>
              <HelpCircleIcon />
            </Container>
          )}
        />
      )}
    </HStack>
  )
}