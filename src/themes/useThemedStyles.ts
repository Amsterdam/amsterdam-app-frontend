import {useContext, useMemo} from 'react'
import {ThemeContext} from './theme.provider'
import {Theme} from './types'

type Generator<T extends {}> = (theme: Theme) => T

const useThemedStyles = <T extends {}>(fn: Generator<T>) => {
  const {theme} = useContext(ThemeContext)

  return useMemo(() => fn(theme), [fn, theme])
}

export {useThemedStyles}
