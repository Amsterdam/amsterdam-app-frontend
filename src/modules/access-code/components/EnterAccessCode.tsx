import {useEffect} from 'react'
import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'

type Props = {
  onIsValid: () => void
}

export const EnterAccessCode = ({onIsValid}: Props) => {
  const {codeEntered, codeLength, isCodeValid, error} = useAccessCode()

  useEffect(() => {
    if (isCodeValid) {
      onIsValid()
    }
  }, [isCodeValid, onIsValid])

  return (
    <AccessCode
      accessCode={codeEntered}
      codeLength={codeLength}
      error={error}
    />
  )
}
