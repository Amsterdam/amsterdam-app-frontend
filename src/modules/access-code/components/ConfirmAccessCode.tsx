import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'

export const ConfirmAccessCode = () => {
  const {codeLength} = useAccessCode()
  const {codeConfirmed} = useConfirmAccessCode()
  const {error} = useAccessCodeError()

  return (
    <AccessCode
      accessCode={codeConfirmed}
      codeLength={codeLength}
      error={error}
    />
  )
}
