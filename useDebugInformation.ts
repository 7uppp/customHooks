import { useEffect, useRef } from 'react'
import useRenderCount from '@hooks/useRenderCount'

type ChangedProps = Record<string, { previous: unknown; current: unknown }>

type DebugInformationResult = {
  count: number
  changedProps: ChangedProps
  timeSinceLastRender: number
  lastRenderTimestamp: number
}

export default function useDebugInformation(
  componentName: string,
  props: Record<string, unknown>
): DebugInformationResult {
  const count = useRenderCount()
  const changedProps = useRef<ChangedProps>({})
  const previousProps = useRef(props)
  const lastRenderTimestamp = useRef(Date.now())
  const propKeys = Object.keys({ ...props, ...previousProps.current })

  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj
    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] },
    }
  }, {})

  const info: DebugInformationResult = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  }

  useEffect(() => {
    previousProps.current = props
    lastRenderTimestamp.current = Date.now()
    console.log('[debug-info]', componentName, info)
  })

  return info
}

// Usage

import useDebugInformation from './useDebugInformation'
import useToggle from './useToggle'
import { useState } from 'react'

export default function DebugInformationComponent() {
  const [boolean, toggle] = useToggle(false)
  const [count, setCount] = useState(0)
  return (
    <>
      <ChildComponent boolean={boolean} count={count} />
      <button onClick={() => toggle(!boolean)}>切换状态</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        数字+1
      </button>
    </>
  )
}
function ChildComponent(props) {
  const info = useDebugInformation('ChildComponent', props)
  return (
    <>
      <div>{props.boolean.toString()}</div>
      <div>{props.count}</div>
      <div>{JSON.stringify(info, null, 2)}</div>
    </>
  )
}
