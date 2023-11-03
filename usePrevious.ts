import { useRef } from 'react'

export default function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T | undefined>(value)
  const previousRef = useRef<T | undefined>()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

// Usage

import { useState } from 'react'
import usePrevious from './usePrevious'

export default function PreviousComponent() {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)
  return (
    <div>
      <div>当前视图的值: {count}</div>
      <div>之前视图的值(初始化时为空):{previousCount}</div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        数字+1
      </button>
    </div>
  )
}
