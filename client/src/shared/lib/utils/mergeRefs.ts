import { isEmpty } from './isEmpty.ts'
import { withoutNullOrUndefined } from './withoutNullOrUndefined.ts'
import { Ref, RefCallback } from 'react'

export const mergeRefs = <T>(
  ...refs: (Ref<T> | undefined | null)[]
): Ref<T> | RefCallback<T> => {
  const definedRefs = withoutNullOrUndefined(refs)
  if (isEmpty(definedRefs)) {
    return null
  }

  return (targetRef) => {
    definedRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(targetRef)
      } else {
        ref.current = targetRef
      }
    })
  }
}