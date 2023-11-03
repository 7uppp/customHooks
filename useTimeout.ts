import { useCallback, useEffect, useRef } from 'react'

type TimeoutHookReturn = {
  reset: () => void
  clear: () => void
}

export default function useTimeout(
  callback: () => void,
  delay: number
): TimeoutHookReturn {
  const callbackRef = useRef<() => void>(callback)
  const timeoutRef = useRef<number | undefined>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

// Usage

import { useState } from 'react'
import useTimeout from '@hooks/useTimeout'

export default function TimeoutComponent() {
  const [count, setCount] = useState(10)
  const { clear, reset } = useTimeout(() => setCount(789), 1000)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数据+1</button>
      <button onClick={clear}>清除定时器</button>
      <button onClick={reset}>设定回调函数，将数字设置为789</button>
    </div>
  )
}
