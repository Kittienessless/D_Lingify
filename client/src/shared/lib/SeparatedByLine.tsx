import { VStack } from './stack'
import styled from 'styled-components'

import { toSizeUnit } from './toSizeUnit'
 
export const SeparatedByLine = styled(VStack)`
  > *:not(:last-child) {
    border-bottom: 1px solid #d6d6d6;
    padding-bottom: ${({ gap = 0 }) => toSizeUnit(gap)};
  }
`