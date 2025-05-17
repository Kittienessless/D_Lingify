import { createPortal } from 'react-dom'

import { useBody } from './hook/useBody'
import { ChildrenProp } from './props.tsx'

export function BodyPortal({ children }: ChildrenProp) {
  const body = useBody()

  if (!body) return null

  return createPortal(children, body)
}