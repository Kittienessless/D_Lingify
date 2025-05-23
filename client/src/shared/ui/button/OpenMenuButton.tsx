import { ComponentProps } from 'react'

import { MoreHorizontalIcon } from '../../assets/MoreHorizontalIcon.tsx'

import { IconButton } from './IconButton'

export function OpenMenuButton(
  props: Omit<ComponentProps<typeof IconButton>, 'icon' | 'title'>,
) {
  return (
    <IconButton title="Open menu" {...props} icon={<MoreHorizontalIcon />} />
  )
}