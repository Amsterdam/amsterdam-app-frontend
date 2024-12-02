import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'

export const ConfirmAccessCode = () => {
  const {codeConfirmed, codeLength, error} = useAccessCode()

  return (
    <AccessCode
      accessCode={codeConfirmed}
      codeLength={codeLength}
      error={error}
    />
  )
}
