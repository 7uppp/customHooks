import { useEffect, useState, RefObject } from 'react'

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin?: string = '0px'
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    if (ref.current == null) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref, rootMargin])

  return isVisible
}

// Usage

import { useRef } from 'react'
import useOnScreen from './useOnScreen'

export default function OnScreenComponentComponent() {
  const headerTwoRef = useRef<HTMLHeadingElement>(null)
  const visible = useOnScreen(headerTwoRef, '-100px')
  return (
    <div>
      <h1>Header</h1>
      <div>
        修改此元素的高度，使页面可滚动，在滚动过程中，可查看待验证元素的可见性
      </div>
      <h1 ref={headerTwoRef}>待验证元素 {visible && '(Visible)'}</h1>
      <div>...</div>
    </div>
  )
}
