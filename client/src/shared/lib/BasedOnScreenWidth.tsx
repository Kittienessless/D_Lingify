import { ReactNode } from 'react'

import { useIsScreenWidthLessThan } from './useIsScreenWidthLessThan.tsx'

interface BasedOnScreenWidthProps {
  less: () => ReactNode
  more: () => ReactNode
  value: number
}

export const BasedOnScreenWidth = ({
  value,
  less,
  more,
}: BasedOnScreenWidthProps) => {
  const isLess = useIsScreenWidthLessThan(value)

  return <>{(isLess ? less : more)()}</>
}