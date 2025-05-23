import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useState } from 'react'

export function useBody() {
  const [body, setBody] = useState<HTMLBodyElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    setBody(document.body as HTMLBodyElement)
  }, [])

  return body
}