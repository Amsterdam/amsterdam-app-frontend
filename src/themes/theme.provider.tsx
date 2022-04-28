import React, {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {defaultDarkTheme, defaultDarkThemeId} from './color/default-dark.theme'
import {
  defaultLightTheme,
  defaultLightThemeId,
} from './color/default-light.theme'
import {Theme} from './types'

type ProvidedValue = {
  theme: Theme
  toggleTheme: () => void
}

const Context = createContext<ProvidedValue>({
  theme: defaultLightTheme,
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
      if (currentTheme.id === defaultLightThemeId) {
        return defaultDarkTheme
      }

      if (currentTheme.id === defaultDarkThemeId) {
        return defaultLightTheme
      }

      return currentTheme
    })
  }, [])

  const memoizedValue = useMemo(() => {
    const value: ProvidedValue = {theme, toggleTheme}

    return value
  }, [theme, toggleTheme])

  return <Context.Provider value={memoizedValue}>{children}</Context.Provider>
})

// Creating a custom context consumer hook for function components
export const useTheme = () => useContext(Context)
