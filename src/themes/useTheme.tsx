import {useSelector} from '@/hooks/redux/useSelector'
import {selectTheme} from '@/themes/slice'

export const useTheme = () => useSelector(selectTheme)
