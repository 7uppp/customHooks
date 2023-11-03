import { RefObject, useEffect, useRef } from 'react'

type EventCallback = (e: Event) => void

export default function useEventListener(
  eventType: string,
  callback: EventCallback,
  element: RefObject<HTMLElement> | EventTarget | null = window
) {
  const callbackRef = useRef<EventCallback | null>(null)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    if (
      !(element instanceof EventTarget) &&
      (element as RefObject<HTMLElement>).current == null
    )
      return
    const handler = (e: Event) => {
      if (callbackRef.current) {
        callbackRef.current(e)
      }
    }
    if ((element as RefObject<HTMLElement>).current) {
      ;(element as RefObject<HTMLElement>).current?.addEventListener(
        eventType,
        handler
      )
    } else {
      ;(element as EventTarget).addEventListener(eventType, handler)
    }

    return () => {
      if ((element as RefObject<HTMLElement>).current) {
        ;(element as RefObject<HTMLElement>).current?.removeEventListener(
          eventType,
          handler
        )
      } else {
        ;(element as EventTarget).removeEventListener(eventType, handler)
      }
    }
  }, [eventType, element])
}

//Usage

import { useState } from 'react'
import useEventListener from './useEventListener'
export default function EventListenerComponent() {
  const [key, setKey] = useState<string>('')
  useEventListener('keydown', (e: Event) => {
    if (e instanceof KeyboardEvent) {
      setKey(e.key)
    }
  })
  return <div> {key} </div>
}
