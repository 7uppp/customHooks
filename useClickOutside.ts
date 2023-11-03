import useEventListener from './useEventListener'
import React from 'react'

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  cb: (e: MouseEvent) => void,
  triggerRef?: React.RefObject<HTMLElement>
) {
  useEventListener(
    'click',
    (e) => {
      if (
        ref.current == null ||
        ref.current.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return
      cb(e as unknown as MouseEvent)
    },
    document
  )
}
