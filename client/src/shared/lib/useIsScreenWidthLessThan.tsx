import { toSizeUnit } from './toSizeUnit'

import { useMedia } from './hook/useMedia'

export const useIsScreenWidthLessThan = (width: number | string) => {
  return useMedia(`(max-width: ${toSizeUnit(width)})`, false)
}