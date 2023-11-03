import { useState } from 'react'

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(value: boolean | undefined) {
    setValue((currentValue) =>
      typeof value === 'boolean' ? value : !currentValue
    )
  }

  return [value, toggleValue] as const
}

// Usage

import useToggle from './useToggle'

export default function ToggleComponent() {
  const [value, toggleValue] = useToggle(false)
  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={() => toggleValue(!value)}>状态切换</button>
      <button onClick={() => toggleValue(true)}>直接设置为true</button>
      <button onClick={() => toggleValue(false)}>直接设置为false</button>
    </div>
  )
}
