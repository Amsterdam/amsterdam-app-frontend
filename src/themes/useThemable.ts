import {useMemo} from 'react'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
type Generator<T extends any> = (theme: Theme) => T

/**
 * Generator function that allows using a `theme`.
 * @param fn The function in which the theme is used.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const useThemable = <T extends any>(fn: Generator<T>) => {
  const theme = useTheme()

  return useMemo(() => fn(theme), [fn, theme])
}
