import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeModalName} from '@/modules/access-code/routes'

export const useHandleAccessCodeValidity = () => {
  const {navigate} = useNavigation()
  const {isCodeValid, attemptsLeft} = useAccessCode()

  useEffect(() => {
    if (!isCodeValid && attemptsLeft <= 0) {
      navigate(AccessCodeModalName.accessCodeInvalid)
    } else if (!isCodeValid) {
      navigate(AccessCodeModalName.accessCode)
    }
  }, [attemptsLeft, isCodeValid, navigate])
}
