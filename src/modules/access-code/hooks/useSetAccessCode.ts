import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {
  selectCodeSet,
  selectIsCodeSet,
  accessCodeSlice,
  setError,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {isAccessCodeValid} from '@/modules/access-code/utils/isAccessCodeValid'

export const useSetAccessCode = () => {
  const dispatch = useDispatch()
  const codeSet = useSelector(selectCodeSet)
  const isCodeSet = useSelector(selectIsCodeSet)
  const {codeLength, setCode} = useAccessCode()
  const {resetError} = useAccessCodeError()

  const setIsCodeSet = useCallback(
    (isSet: boolean) => dispatch(accessCodeSlice.actions.setIsCodeSet(isSet)),
    [dispatch],
  )

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

  return {
    codeSet,
    isCodeSet,
    setIsCodeSet,
  }
}
