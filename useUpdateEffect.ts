import { useEffect, useRef } from 'react'

type EffectHookType = typeof useEffect
const createUpdateEffect: (effect: EffectHookType) => EffectHookType =
  (effect) => (callback, deps) => {
    const isMounted = useRef(false)

    // 处理刷新
    effect(() => {
      return () => {
        isMounted.current = false
      }
    }, [])

    effect(() => {
      if (!isMounted.current) {
        isMounted.current = true
      } else {
        return callback()
      }
    }, deps)
  }
export default createUpdateEffect(useEffect)

// Usage
import { useState } from 'react'
import useUpdateEffect from './useUpdateEffect'

export default function UpdateEffectComponent() {
  const [count, setCount] = useState(10)
  useUpdateEffect(() => alert(count), [count])
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数字+1</button>
    </div>
  )
}
