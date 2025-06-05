import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {accessCodeSlice} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {SecureItemKey} from '@/utils/secureStorage'

const CODE_LENGTH = 5

export const useAccessCode = () => {
  const dispatch = useDispatch()
  const removeSecureItems = useRemoveSecureItems()
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

  const resetAccessCode = useCallback(async () => {
    dispatch(accessCodeSlice.actions.reset())
    await removeSecureItems([SecureItemKey.accessCode])
  }, [dispatch, removeSecureItems])

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
