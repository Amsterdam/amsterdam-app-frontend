import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useSetSecureAccessCode} from '@/modules/access-code/hooks/useSetSecureAccessCode'
import {
  selectCodeEntered,
  selectCodeSet,
  selectCodeConfirmed,
  selectAttemptsLeft,
  selectError,
  selectIsCodeSet,
  selectIsCodeConfirmed,
  selectCodeValidTimestamp,
  setError,
  accessCodeSlice,
  setAttemptsLeft,
  setIsCodeValid,
  resetAttemptsLeft,
  selectIsEnteringCode,
  selectUseBiometrics,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {isAccessCodeValid} from '@/modules/access-code/utils/isAccessCodeValid'
import {dayjs} from '@/utils/datetime/dayjs'

const CODE_LENGTH = 5

export const useAccessCode = () => {
  const dispatch = useDispatch()

  const codeEntered = useSelector(selectCodeEntered)
  const codeSet = useSelector(selectCodeSet)
  const codeConfirmed = useSelector(selectCodeConfirmed)
  const attemptsLeft = useSelector(selectAttemptsLeft)
  const error = useSelector(selectError)
  const isCodeSet = useSelector(selectIsCodeSet)
  const codeValidTimestamp = useSelector(selectCodeValidTimestamp)
  const isCodeConfirmed = useSelector(selectIsCodeConfirmed)
  const isEnteringCode = useSelector(selectIsEnteringCode)
  const useBiometrics = useSelector(selectUseBiometrics)

  const {accessCode: secureAccessCode} = useGetSecureAccessCode()
  const setSecureAccessCode = useSetSecureAccessCode()

  const codeLength = CODE_LENGTH

  const resetError = useCallback(() => dispatch(setError('')), [dispatch])
  const setIsCodeSet = useCallback(
    (isSet: boolean) => dispatch(accessCodeSlice.actions.setIsCodeSet(isSet)),
    [dispatch],
  )
  const isCodeValid = useMemo(() => {
    const now = Date.now()
    const msToMinutes = 1000 * 60

    if (!codeValidTimestamp) {
      return false
    } else {
      return (
        Math.abs(dayjs(now).diff(dayjs(codeValidTimestamp))) <= 15 * msToMinutes
      )
    }
  }, [codeValidTimestamp])

  const setIsCodeConfirmed = useCallback(
    (isConfirmed: boolean) =>
      dispatch(accessCodeSlice.actions.setIsCodeConfirmed(isConfirmed)),
    [dispatch],
  )

  const setIsEnteringCode = useCallback(
    (isEntering: boolean) =>
      dispatch(accessCodeSlice.actions.setIsEnteringCode(isEntering)),
    [dispatch],
  )

  const setCode = useCallback(
    ({code, type}: {code: number[]; type: AccessCodeType}) =>
      dispatch(accessCodeSlice.actions.setCode({code, type})),
    [dispatch],
  )

  const setUseBiometrics = useCallback(
    (permission: boolean) =>
      dispatch(accessCodeSlice.actions.setUseBiometrics(permission)),
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
    if (isCodeValid) {
      return
    }

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
    isEnteringCode,
    removeDigit,
    resetError,
    setCode,
    setIsCodeSet,
    setIsCodeConfirmed,
    setIsEnteringCode,
    setUseBiometrics,
    useBiometrics,
  }
}
