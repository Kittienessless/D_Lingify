import { toSizeUnit } from '../toSizeUnit'

import { useMedia } from './useMedia.tsx'

export const useIsScreenWidthLessThan = (width: number | string) => {
  return useMedia(`(max-width: ${toSizeUnit(width)})`, false)
}