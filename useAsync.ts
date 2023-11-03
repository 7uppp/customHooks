import { useCallback, useEffect, useState } from 'react'

export type AsyncReturn<T> = {
  loading: boolean
  error?: Error | null
  value?: T
}

export default function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: unknown[] = []
): AsyncReturn<T> {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const [value, setValue] = useState<T | undefined>()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then((result) => setValue(result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [...dependencies])

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}

//Usage

import React from 'react'
import useAsync, { AsyncReturn } from './useAsync'

export default function AsyncComponent() {
  const { loading, error, value }: AsyncReturn<string> = useAsync(() => {
    return new Promise<string>((resolve, reject) => {
      // 这里可以替换成正式场景
      const success = false
      setTimeout(() => {
        success ? resolve('成功了') : reject('失败了')
      }, 1000)
    })
  })

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  )
}
