import React, {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {darkTheme, darkThemeId} from './dark-color-theme'
import {lightTheme, lightThemeId} from './light-color-theme'
import {Theme} from './types'

type ProvidedValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ProvidedValue>({
  theme: lightTheme,
  toggleTheme: () => {
    console.warn('Error: `ThemeProvider` is not being rendered.')
  },
})

type Props = {
  initialTheme: Theme
  children?: ReactNode
}

export const ThemeProvider = memo<Props>(({children, initialTheme}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => {
      if (currentTheme.id === lightThemeId) {
        return darkTheme
      }

      if (currentTheme.id === darkThemeId) {
        return lightTheme
      }

      return currentTheme
    })
  }, [])

  const memoizedValue = useMemo(() => {
    const value: ProvidedValue = {theme, toggleTheme}

    return value
  }, [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  )
})
