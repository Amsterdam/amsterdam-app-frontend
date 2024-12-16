import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectError, setError} from '@/modules/access-code/slice'

export const useAccessCodeError = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const resetError = useCallback(() => dispatch(setError()), [dispatch])

  return {error, resetError}
}
