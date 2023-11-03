import { useCallback, useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const value = storageObject.getItem(key)
    if (value != null) return JSON.parse(value)
    if (typeof defaultValue === 'function') {
      const value = (defaultValue as () => T)()
      return value
    } else {
      return JSON.parse(JSON.stringify(defaultValue))
    }
  })
  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined as unknown as T)
  }, [])

  return [value, setValue, remove]
}

// Usage
import { useSessionStorage, useLocalStorage } from './useStorage'

export default function StorageComponent() {
  const [info, setInfo, removeInfo] = useSessionStorage<{ name: string }>(
    'info',
    {
      name: 'front789',
    }
  )
  const [age, setAge, removeAge] = useLocalStorage<number>('age', 26)

  return (
    <div>
      <div>
        {info?.name} -{age}
      </div>
      <button onClick={() => setInfo({ name: '范美丽' })}>修改名称</button>
      <button onClick={() => setAge(18)}>修改年龄</button>
      <button onClick={removeInfo}>删除名称</button>
      <button onClick={removeAge}>删除年龄</button>
    </div>
  )
}
