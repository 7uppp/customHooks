import { useEffect } from 'react'
import useMediaQuery from './useMediaQuery'
import { useLocalStorage } from './useStorage'

type UseDarkModeReturn = [boolean, (value: boolean) => void]

export default function useDarkMode(): UseDarkModeReturn {
  const [darkMode, setDarkMode] = useLocalStorage('useDarkMode', false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const enabled = darkMode ?? prefersDarkMode

  useEffect(() => {
    document.body.classList.toggle('dark-mode', enabled)
  }, [enabled])

  const toggleDarkMode = (value: boolean) => {
    setDarkMode(value)
  }

  return [enabled, toggleDarkMode]
}

// Usage

import useDarkMode from './useDarkMode'
import './body.css'

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode()
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        border: `1px solid ${darkMode ? 'white' : 'black'}`,
        background: 'none',
        color: darkMode ? 'white' : 'black',
      }}>
      切换 Dark Mode
    </button>
  )
}
