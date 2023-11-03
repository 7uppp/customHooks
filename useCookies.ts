import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'

type CookieHookReturn<T> = [
  T | null,
  (newValue: T, options?: Cookies.CookieAttributes) => void,
  () => void
]

export default function useCookie<T>(
  name: string,
  defaultValue: T
): CookieHookReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    const cookie = Cookies.get(name)
    if (cookie) return JSON.parse(JSON.stringify(cookie))
    Cookies.set(name, JSON.stringify(defaultValue))
    return defaultValue
  })

  const updateCookie = useCallback(
    (newValue: T, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, JSON.stringify(newValue), options)
      setValue(newValue)
    },
    [name]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(name)
    setValue(null)
  }, [name])

  return [value, updateCookie, deleteCookie]
}
