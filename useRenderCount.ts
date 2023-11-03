import { useEffect, useRef } from 'react'

export default function useRenderCount(): number {
  const count = useRef(1)
  useEffect(() => {
    count.current++
  })
  return count.current
}

// Usage

import useRenderCount from './useRenderCount'
import useToggle from './useToggle'

export default function RenderCountComponent() {
  const [boolean, toggle] = useToggle(false)
  const renderCount = useRenderCount()
  return (
    <>
      <div>{boolean.toString()}</div>
      <div>组件渲染次数：{renderCount}</div>
      <button onClick={() => toggle(!boolean)}>状态切换</button>
    </>
  )
}
