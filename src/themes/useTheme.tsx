import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {selectTheme} from '@/themes/themeSlice'

const useTheme = () => {
  const {theme} = useSelector(selectTheme)

  return useMemo(() => theme, [theme])
}

export {useTheme}
