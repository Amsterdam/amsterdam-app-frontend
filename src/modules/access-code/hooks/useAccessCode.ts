import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {accessCodeSlice} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'

const CODE_LENGTH = 5

export const useAccessCode = () => {
  const dispatch = useDispatch()
  const {error, resetError} = useAccessCodeError()

  const codeLength = CODE_LENGTH

  const addDigit = useCallback(
    (digit: number, type: AccessCodeType) => {
      if (error) {
        resetError()
      }

      if (digit >= 0 && digit <= 9) {
        dispatch(accessCodeSlice.actions.addDigit({digit, type}))
      }
    },
    [dispatch, error, resetError],
  )

  const removeDigit = useCallback(
    (type: AccessCodeType) => {
      dispatch(accessCodeSlice.actions.removeDigit(type))
    },
    [dispatch],
  )

  const resetAccessCode = useCallback(() => {
    dispatch(accessCodeSlice.actions.reset())
  }, [dispatch])

  const setCode = useCallback(
    ({code, type}: {code: number[]; type: AccessCodeType}) =>
      dispatch(accessCodeSlice.actions.setCode({code, type})),
    [dispatch],
  )

  return {
    addDigit,
    codeLength,
    removeDigit,
    resetAccessCode,
    setCode,
  }
}
