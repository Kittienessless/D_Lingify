import styled from 'styled-components'

import { Text } from './index.tsx'
 
export const LinkText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: '#01223';
  }
`