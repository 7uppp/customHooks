import { useState, useEffect } from 'react'
import useEventListener from '@hooks/useEventListener'

export default function useMediaQuery(mediaQuery: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
    null
  )

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener(
    'change',
    (e) => setIsMatch((e as MediaQueryListEvent).matches),
    mediaQueryList
  )

  return isMatch
}
// Usage
import useMediaQuery from './useMediaQuery'

export default function MediaQueryComponent() {
  // 传人媒体查询条件
  const isLarge = useMediaQuery('(min-width: 200px)')
  return <div>视口超过查询条件了: {isLarge.toString()}</div>
}
