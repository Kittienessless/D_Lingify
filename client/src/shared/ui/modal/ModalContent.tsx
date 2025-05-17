import styled from 'styled-components'

import { VStack } from '../../lib/stack'
import { takeWholeSpace } from '../../lib/takeWholeSpace'

export const ModalContent = styled(VStack)`
  ${takeWholeSpace};
  overflow-y: auto;
  
`