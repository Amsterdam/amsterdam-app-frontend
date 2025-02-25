import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectIsLoginStepsActive,
  setLoginStepsActive,
} from '@/modules/parking/slice'

export const useLoginSteps = () => {
  const dispatch = useDispatch()
  const isLoginStepsActive = useSelector(selectIsLoginStepsActive)

  const setIsLoginStepsActive = useCallback(
    (isActive: boolean) => {
      dispatch(setLoginStepsActive(isActive))
    },
    [dispatch],
  )

  return {isLoginStepsActive, setIsLoginStepsActive}
}
