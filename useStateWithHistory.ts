import { useCallback, useRef, useState, Dispatch, SetStateAction } from 'react'

type HistoryAction<T> = {
  history: T[]
  pointer: number
  back: () => void
  forward: () => void
  go: (index: number) => void
}

type StateWithHistoryReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  HistoryAction<T>
]

function useStateWithHistory<T>(
  defaultValue: T,
  capacity: number = 10
): StateWithHistoryReturn<T> {
  const [value, setValue] = useState<T>(defaultValue)
  const historyRef = useRef<T[]>([value])
  const pointerRef = useRef<number>(0)

  const set = useCallback(
    (v: SetStateAction<T>) => {
      const resolvedValue =
        typeof v === 'function' ? (v as (prevState: T) => T)(value) : v

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1)
        }

        historyRef.current.push(resolvedValue)

        while (historyRef.current.length > capacity) {
          historyRef.current.shift()
        }

        pointerRef.current = historyRef.current.length - 1
      }

      setValue(resolvedValue)
    },
    [capacity, value]
  )

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return
    pointerRef.current--
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return
    pointerRef.current++
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return
    pointerRef.current = index
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const historyAction: HistoryAction<T> = {
    history: historyRef.current,
    pointer: pointerRef.current,
    back,
    forward,
    go,
  }

  return [value, set, historyAction]
}

export default useStateWithHistory

// Usage

import useStateWithHistory from './useStateWithHistory'

export default function StateWithHistoryComponent() {
  const [count, setCount, { history, pointer, back, forward, go }] =
    useStateWithHistory(1)
  return (
    <div>
      <div>当前指针所指位置的数值:{count}</div>
      <div>History的所有值{history.join(', ')}</div>
      <div>指针指向的Index(从0开始):{pointer}</div>
      <button onClick={() => setCount((currentCount) => currentCount * 2)}>
        将之前的数据数值翻倍后，插入到History
      </button>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        将之前的数据数值+1后，插入到History
      </button>
      <button onClick={back}>回退</button>
      <button onClick={forward}>前进</button>
      <button onClick={() => go(2)}>指向第二步</button>
    </div>
  )
}
