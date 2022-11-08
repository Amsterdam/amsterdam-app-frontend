import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {selectTheme} from '@/themes/slice'
import {Theme} from '@/themes/themes'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
type Generator<T extends any> = (theme: Theme) => T

/**
 * Generator function that allows using a `theme`.
 * @param fn The function in which the theme is used.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
const useThemable = <T extends any>(fn: Generator<T>) => {
  const {theme} = useSelector(selectTheme)

  return useMemo(() => fn(theme), [fn, theme])
}

export {useThemable}
