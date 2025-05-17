import { ComponentProps } from 'react'

import { CloseIcon } from '../../assets/CloseIcon.tsx'

import { IconButton } from './IconButton.tsx'

export function CloseButton(
  props: Omit<ComponentProps<typeof IconButton>, 'icon' | 'title'>,
) {
  return <IconButton title="Close" {...props} icon={<CloseIcon />} />
}