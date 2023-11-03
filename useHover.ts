import { useState, RefObject } from 'react'
import useEventListener from './useEventListener'

export default function useHover(ref: RefObject<HTMLElement>): boolean {
  const [hovered, setHovered] = useState<boolean>(false)
  useEventListener('mouseover', () => setHovered(true), ref)
  useEventListener('mouseout', () => setHovered(false), ref)

  return hovered
}

// Usage

import { useRef } from 'react'
import useHover from './useHover'

export default function HoverComponent() {
  const elementRef = useRef<HTMLDivElement>(null)
  const hovered = useHover(elementRef)

  return (
    <section>
      <div
        ref={elementRef}
        style={{
          backgroundColor: hovered ? 'blue' : 'red',
          width: '100px',
          height: '100px',
          position: 'absolute',
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 50px)',
        }}>
        {hovered ? '我处于hover状态' : '正常状态'}
      </div>
    </section>
  )
}
