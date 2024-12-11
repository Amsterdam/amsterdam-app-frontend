import {useEffect} from 'react'
import {useBiometrics} from '@/hooks/useBiometrics'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

type Props = {
  onAuthenticatedWithBiometrics: () => void
}

export const AuthenticateWithCodeOrBiometrics = ({
  onAuthenticatedWithBiometrics,
}: Props) => {
  const {useBiometrics: isUseBiometrics} = useAccessCode()
  const {authenticated, authenticate} = useBiometrics({
    autoTrigger: isUseBiometrics,
    promptMessage: 'Ontgrendel toegang tot je stadspas.',
    cancelButtonText: 'Terug',
    fallbackPromptMessage: 'Ontgrendel de stadspas.',
  })

  useEffect(() => {
    if (authenticated) {
      onAuthenticatedWithBiometrics()
    }
  }, [authenticated, onAuthenticatedWithBiometrics])

  return (
    <AccessCodeKeyBoard
      onPressAuthenticate={authenticate}
      type={AccessCodeType.codeEntered}
    />
  )
}
