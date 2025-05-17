import { ComponentProps } from 'react'

import { AsProp } from '../../lib/props'
import { Text } from '../text'

export const ModalSubTitleText = (
  props: ComponentProps<typeof Text> & AsProp,
) => <Text color="supporting" as="div" {...props} />