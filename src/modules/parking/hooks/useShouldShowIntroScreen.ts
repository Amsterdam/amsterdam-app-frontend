import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectShouldShowIntroScreen,
  setShouldShowIntroScreenAction,
} from '@/modules/parking/slice'

export const useShouldShowIntroScreen = () => {
  const dispatch = useDispatch()
  const shouldShowIntroScreen = useSelector(selectShouldShowIntroScreen)

  const setShouldShowIntroScreen = useCallback(
    (shouldShow: boolean) => {
      dispatch(setShouldShowIntroScreenAction(shouldShow))
    },
    [dispatch],
  )

  return {shouldShowIntroScreen, setShouldShowIntroScreen}
}
