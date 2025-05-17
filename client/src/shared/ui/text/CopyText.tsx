import { CopyIcon } from '../../assets/CopyIcon.tsx'
import styled from 'styled-components'
import { useState } from 'react'
import { CheckIcon } from '../../assets/CheckIcon.tsx'
import { Text, TextProps } from './index.tsx'
import { MatchP }  from '../../lib/MatchP.tsx'
import { transition } from '../../lib/transition.tsx'
import { ChildrenProp, UiProps } from '../../lib/props.tsx'
import { copyTextToClipboard } from '../../lib/copyTextToClipboard.ts'

type CopyTextProps = {
  content: string
  isIconAlwaysVisible?: boolean
} & ChildrenProp &
  TextProps &
  UiProps

const IconWr = styled(Text)<{ isIconAlwaysVisible: boolean }>`
  margin-left: 4px;
  ${transition};
  color:  {
    false: 'transparent',
    true: 'textShy',
  })};
  svg {
    vertical-align: middle;
  }
`

const Container = styled(Text)`
  cursor: pointer;

  &:hover ${IconWr} {
    color: '#f65120';
  }
`

type IconToShow = 'copy' | 'copied'

export const CopyText = ({
  content,
  children,
  isIconAlwaysVisible = true,
  ...rest
}: CopyTextProps) => {
  const [iconToShow, setIconToShow] = useState<IconToShow>('copy')

  return (
    <Container
      as="span"
      onMouseLeave={() => setIconToShow('copy')}
      onTouchEnd={() => setIconToShow('copy')}
      onClick={() => {
        copyTextToClipboard(content)
        setIconToShow('copied')
      }}
      {...rest}
    >
      {children}
      <IconWr isIconAlwaysVisible={isIconAlwaysVisible} as="span">
        <MatchP
          value={iconToShow}
          copy={() => <CopyIcon />}
          copied={() => <CheckIcon />}
        />
      </IconWr>
    </Container>
  )
}