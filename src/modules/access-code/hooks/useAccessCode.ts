import {useCallback, useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useSetSecureAccessCode} from '@/modules/access-code/hooks/useSetSecureAccessCode'
import {AccessCodeModalName} from '@/modules/access-code/routes'
import {
  selectCodeEntered,
  selectCodeSet,
  selectCodeConfirmed,
  selectAttemptsLeft,
  selectError,
  selectIsCodeSet,
  selectIsCodeConfirmed,
  selectIsCodeValid,
  setError,
  accessCodeSlice,
  setAttemptsLeft,
  setIsCodeValid,
  resetAttemptsLeft,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {isAccessCodeValid} from '@/modules/access-code/utils/isAccessCodeValid'

const CODE_LENGTH = 5

export const useAccessCode = () => {
  const dispatch = useDispatch()
  const codeEntered = useSelector(selectCodeEntered)
  const codeSet = useSelector(selectCodeSet)
  const codeConfirmed = useSelector(selectCodeConfirmed)
  const attemptsLeft = useSelector(selectAttemptsLeft)
  const error = useSelector(selectError)
  const isCodeSet = useSelector(selectIsCodeSet)
  const isCodeConfirmed = useSelector(selectIsCodeConfirmed)
  const isCodeValid = useSelector(selectIsCodeValid)
  const secureAccessCode = useGetSecureAccessCode()
  const setSecureAccessCode = useSetSecureAccessCode()

  const {navigate} = useNavigation()
  const codeLength = CODE_LENGTH

  const resetError = useCallback(() => dispatch(setError('')), [dispatch])
  const setIsCodeSet = useCallback(
    (isSet: boolean) => dispatch(accessCodeSlice.actions.setIsCodeSet(isSet)),
    [dispatch],
  )

  const setIsCodeConfirmed = useCallback(
    (isConfirmed: boolean) =>
      dispatch(accessCodeSlice.actions.setIsCodeConfirmed(isConfirmed)),
    [dispatch],
  )

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

  const onAccessCodeEntered = useCallback(() => {
    if (codeEntered.join('') === secureAccessCode) {
      dispatch(resetAttemptsLeft())
      dispatch(setIsCodeValid(true))
      resetError()
    } else {
      dispatch(setAttemptsLeft(attemptsLeft - 1))
      dispatch(
        setError(
          `Toegangscode is onjuist. Nog ${attemptsLeft - 1} pogingen over.`,
        ),
      )
      setCode({code: [], type: AccessCodeType.codeEntered})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeEntered, dispatch, resetError, secureAccessCode])

  useEffect(() => {
    if (codeEntered.length !== codeLength) {
      return
    }

    onAccessCodeEntered()
  }, [codeEntered.length, codeLength, onAccessCodeEntered])

  useEffect(() => {
    if (attemptsLeft <= 0) {
      navigate(AccessCodeModalName.accessCodeInvalid)
    }
  }, [attemptsLeft, navigate])

  useEffect(() => {
    if (codeSet.length !== codeLength) {
      return
    }

    if (!isAccessCodeValid(codeSet)) {
      dispatch(setError('Uw toegangscode is te makkelijk.'))
      setCode({code: [], type: AccessCodeType.codeSet})
    } else {
      resetError()
      setIsCodeSet(true)
    }
  }, [
    codeLength,
    codeSet,
    dispatch,
    isCodeSet,
    resetError,
    setCode,
    setIsCodeSet,
  ])

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
    isCodeSet,
    resetError,
    setCode,
    setIsCodeConfirmed,
    setSecureAccessCode,
  ])

  return {
    addDigit,
    attemptsLeft,
    codeConfirmed,
    codeEntered,
    codeSet,
    codeLength,
    error,
    isCodeSet,
    isCodeConfirmed,
    isCodeValid,
    removeDigit,
    resetError,
    setCode,
    setIsCodeSet,
    setIsCodeConfirmed,
  }
}
