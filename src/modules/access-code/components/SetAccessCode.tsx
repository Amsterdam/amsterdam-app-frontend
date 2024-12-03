import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'

export const SetAccessCode = () => {
  const {codeLength, codeSet, error} = useAccessCode()

  return (
    <AccessCode
      accessCode={codeSet}
      codeLength={codeLength}
      error={error}
    />
  )
}
