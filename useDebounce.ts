import { useEffect, DependencyList } from 'react'
import useTimeout from './useTimeout'

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [clear])
}

// Usage

import { useState } from 'react'
import useDebounce from '@hooks/useDebounce'

export default function DebounceComponent() {
  const [count, setCount] = useState(10)
  useDebounce(() => alert(`触发回掉，并获取最新的值${count}`), 1000, [count])
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数字+1</button>
    </div>
  )
}
