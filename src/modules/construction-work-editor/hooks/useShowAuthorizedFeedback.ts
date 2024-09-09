import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/construction-work-editor/alerts'
import {setHasSeenWelcomeMessage} from '@/modules/construction-work-editor/slice'
import {useAlert} from '@/store/slices/alert'

export const useShowAuthorizedFeedback = () => {
  const dispatch = useDispatch()
  const {setAlert} = useAlert()

  const success = useCallback(() => {
    setAlert(alerts.loginSuccess)
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch, setAlert])

  const error = useCallback(() => {
    setAlert(alerts.loginFailed)
    dispatch(setHasSeenWelcomeMessage(true))
  }, [dispatch, setAlert])

  return {error, success}
}
