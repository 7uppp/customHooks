import { useState } from 'react'
import useEventListener from './useEventListener'

export default function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine)

  useEventListener('online', () => setOnline(navigator.onLine))
  useEventListener('offline', () => setOnline(navigator.onLine))

  return online
}

// Usage

import useOnlineStatus from './useOnlineStatus'

export default function OnlineStatusComponent() {
  const online = useOnlineStatus()
  return <div>用户是否在线{online.toString()}</div>
}
