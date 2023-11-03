import { useState } from 'react'
import copy from 'copy-to-clipboard'

interface Options {
  debug?: boolean
  message?: string
  format?: string
  onCopy?: (clipboardData: object) => void
}

type CopyToClipboardHookReturn = [
  (text: string, options?: Options) => void,
  { value: string | null; success: boolean | null }
]

export default function useCopyToClipboard(): CopyToClipboardHookReturn {
  const [value, setValue] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)

  const copyToClipboard = (text: string, options?: Options) => {
    const result = copy(text, options)
    if (result) setValue(text)
    setSuccess(result)
  }

  return [copyToClipboard, { value, success }]
}

// Usage
import useCopyToClipboard from './useCopyToClipboard'
import { useRef } from 'react'

export default function CopyToClipboardComponent() {
  const [copyToClipboard, { success, value }] = useCopyToClipboard()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <button onClick={() => copyToClipboard(String(inputRef.current?.value))}>
        {success ? '复制过了' : '未复制'}
      </button>
      <input type="text" ref={inputRef} />
      复制的值-{value}
    </>
  )
}
