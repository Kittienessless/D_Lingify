import { ChildrenProp } from '../../lib/props'
import { Text, TextProps } from '../text'

export const ModalTitleText = (props: TextProps & ChildrenProp) => (
  <Text as="div" weight="600" size={18} {...props} />
)