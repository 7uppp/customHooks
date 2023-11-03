import { useState, useCallback } from 'react'

export default function useStateWithValidation<T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
): [T, (nextState: T | ((prevState: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initialValue)
  const [isValid, setIsValid] = useState(() => validationFunc(state))

  const onChange = useCallback(
    (nextState: T | ((prevState: T) => T)) => {
      const value =
        typeof nextState === 'function'
          ? (nextState as (prevState: T) => T)(state)
          : nextState
      setState(value)
      setIsValid(validationFunc(value))
    },
    [validationFunc, state]
  )

  return [state, onChange, isValid]
}

// Usage

export default function StateWithValidationComponent() {
  const [username, setUsername, isValid] = useStateWithValidation<string>(
    (name) => name.length > 5,
    '前端柒八九'
  )

  return (
    <>
      <div>输入框内容是否大于5: {isValid.toString()}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </>
  )
}
