import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {accessCodeSlice} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'

const CODE_LENGTH = 5

export const useAccessCode = () => {
  const dispatch = useDispatch()

  const codeLength = CODE_LENGTH

  const setCode = useCallback(
    ({code, type}: {code: number[]; type: AccessCodeType}) =>
      dispatch(accessCodeSlice.actions.setCode({code, type})),
    [dispatch],
  )

  const addDigit = useCallback(
    (digit: number, type: AccessCodeType) => {
      if (digit >= 0 && digit <= 9) {
        dispatch(accessCodeSlice.actions.addDigit({digit, type}))
      }
    },
    [dispatch],
  )

  const removeDigit = useCallback(
    (type: AccessCodeType) => {
      dispatch(accessCodeSlice.actions.removeDigit(type))
    },
    [dispatch],
  )

  return {
    addDigit,
    codeLength,
    removeDigit,
    setCode,
  }
}
