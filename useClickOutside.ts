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

// Usage

import { useRef, useState } from 'react'
import useClickOutside from './useClickOutside'

export default function ClickOutsideComponent() {
  const [open, setOpen] = useState<boolean>(false)
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null)
  const triggerRef: React.RefObject<HTMLButtonElement> = useRef(null)

  useClickOutside(
    modalRef,
    () => {
      if (open) setOpen(false)
    },
    triggerRef
  )

  return (
    <>
      <button onClick={() => setOpen(true)} ref={triggerRef}>
        打开弹窗
      </button>
      <div
        ref={modalRef}
        style={{
          display: open ? 'block' : 'none',
          backgroundColor: 'blue',
          color: 'white',
          width: '100px',
          height: '100px',
          position: 'absolute',
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 50px)',
        }}>
        <span>我是一个萌萌哒的弹窗</span>
      </div>
    </>
  )
}
