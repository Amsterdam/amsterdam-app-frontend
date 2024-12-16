import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {useSetSecureAccessCode} from '@/modules/access-code/hooks/useSetSecureAccessCode'
import {
  selectCodeConfirmed,
  accessCodeSlice,
  setError,
  selectIsCodeConfirmed,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'

export const useConfirmAccessCode = () => {
  const dispatch = useDispatch()
  const codeConfirmed = useSelector(selectCodeConfirmed)
  const isCodeConfirmed = useSelector(selectIsCodeConfirmed)
  const setIsCodeConfirmed = useCallback(
    (isConfirmed: boolean) =>
      dispatch(accessCodeSlice.actions.setIsCodeConfirmed(isConfirmed)),
    [dispatch],
  )
  const setSecureAccessCode = useSetSecureAccessCode()
  const {codeLength, setCode} = useAccessCode()
  const {codeSet} = useSetAccessCode()
  const {resetError} = useAccessCodeError()

  useEffect(() => {
    if (codeConfirmed.length !== codeLength) {
      return
    }

    if (codeConfirmed.join('') !== codeSet.join('')) {
      dispatch(setError('Toegangscodes zijn niet hetzelfde.'))
      setCode({code: [], type: AccessCodeType.codeConfirmed})
    } else {
      resetError()
      setSecureAccessCode(codeConfirmed.join(''))
      setIsCodeConfirmed(true)
    }
  }, [
    codeConfirmed,
    codeLength,
    codeSet,
    dispatch,
    resetError,
    setCode,
    setIsCodeConfirmed,
    setSecureAccessCode,
  ])

  return {codeConfirmed, isCodeConfirmed, setIsCodeConfirmed}
}
