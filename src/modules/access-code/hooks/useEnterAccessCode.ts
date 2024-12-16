import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {
  selectAttemptsLeft,
  selectCodeEntered,
  selectIsEnteringCode,
  accessCodeSlice,
  resetAttemptsLeft,
  setIsCodeValid,
  setAttemptsLeft,
  setError,
  selectCodeValidTimestamp,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const useEnterAccessCode = () => {
  const dispatch = useDispatch()
  const attemptsLeft = useSelector(selectAttemptsLeft)
  const codeEntered = useSelector(selectCodeEntered)
  const isEnteringCode = useSelector(selectIsEnteringCode)
  const {accessCode: secureAccessCode} = useGetSecureAccessCode()
  const codeValidTimestamp = useSelector(selectCodeValidTimestamp)
  const {codeLength, setCode} = useAccessCode()
  const {resetError} = useAccessCodeError()

  const setIsEnteringCode = useCallback(
    (isEntering: boolean) =>
      dispatch(accessCodeSlice.actions.setIsEnteringCode(isEntering)),
    [dispatch],
  )
  const onAccessCodeEntered = useCallback(
    (withBiometrics = false) => {
      if (isCodeValid) {
        return
      }

      if (codeEntered.join('') === secureAccessCode || withBiometrics) {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [codeEntered, dispatch, resetError, secureAccessCode],
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

  useEffect(() => {
    if (codeEntered.length !== codeLength) {
      return
    }

    onAccessCodeEntered()
  }, [codeEntered.length, codeLength, onAccessCodeEntered])

  return {
    attemptsLeft,
    codeEntered,
    isCodeValid,
    isEnteringCode,
    onAccessCodeEntered,
    setIsEnteringCode,
  }
}
