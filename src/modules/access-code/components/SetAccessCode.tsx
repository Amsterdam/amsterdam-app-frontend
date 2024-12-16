import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'

export const SetAccessCode = () => {
  const {codeLength} = useAccessCode()
  const {codeSet} = useSetAccessCode()
  const {error} = useAccessCodeError()

  return (
    <AccessCode
      accessCode={codeSet}
      codeLength={codeLength}
      error={error}
    />
  )
}
