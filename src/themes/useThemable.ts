import {useContext, useMemo} from 'react'
import {ThemeContext} from './theme.provider'
import {Theme} from './themes'

type Generator<T extends {}> = (theme: Theme) => T

/**
 * Generator function that allows using a `theme`.
 * @param fn The function in which the theme is used.
 */
const useThemable = <T extends {}>(fn: Generator<T>) => {
  const {theme} = useContext(ThemeContext)

  return useMemo(() => fn(theme), [fn, theme])
}

export {useThemable}
