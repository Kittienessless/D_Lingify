import { useEffect, useLayoutEffect } from 'react'

import { hasWindow } from '../window'

export const useIsomorphicLayoutEffect = hasWindow ? useLayoutEffect : useEffect