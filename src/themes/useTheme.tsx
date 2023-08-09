import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectTheme} from '@/themes/slice'

const useTheme = () => {
  const {theme} = useSelector(selectTheme)

  return useMemo(() => theme, [theme])
}

export {useTheme}
