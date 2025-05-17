import styled from 'styled-components'

import { centerContent } from './centerContent'
import { takeWholeSpace } from './takeWholeSpace'

export const CenterAbsolutely = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  ${takeWholeSpace};
  ${centerContent};
`