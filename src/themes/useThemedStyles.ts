import {useMemo} from 'react'
import {Theme, useTheme} from './'

type Generator<T extends {}> = (theme: Theme) => T

const useThemedStyles = <T extends {}>(fn: Generator<T>) => {
  const {theme} = useTheme()

  return useMemo(() => fn(theme), [fn, theme])
}

export {useThemedStyles}
