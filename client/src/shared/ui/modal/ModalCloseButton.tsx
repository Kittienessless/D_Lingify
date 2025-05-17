import styled from 'styled-components'

import { Hoverable } from '../../lib/Hoverable.tsx'
import { centerContent } from '../../lib/centerContent'
import { sameDimensions } from '../../lib/sameDimensions'
import { transition } from '../../lib/transition'
import { CloseIcon } from '../../assets/CloseIcon.tsx'
import { OnClickProp } from '../../lib/props'

const IconWrapper = styled.div`
  font-size: 20px;
  ${sameDimensions(24)};
  ${centerContent};
  ${transition};
`

const Container = styled(Hoverable)`

  color: ${({theme}) => theme.colors.font};
  &:hover ${IconWrapper} {
    color:rgb(143, 143, 145);
  }
`

export const ModalCloseButton = ({ onClick }: OnClickProp) => {
  return (
    <Container onClick={onClick}>
      <IconWrapper>
        <CloseIcon />
      </IconWrapper>
    </Container>
  )
}