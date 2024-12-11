import {useEffect} from 'react'
import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'

export const EnterAccessCode = () => {
  const {codeEntered, codeLength, error, setIsEnteringCode} = useAccessCode()

  useEffect(() => {
    setIsEnteringCode(true)

    return () => {
      setIsEnteringCode(false)
    }
  }, [setIsEnteringCode])

  return (
    <AccessCode
      accessCode={codeEntered}
      codeLength={codeLength}
      error={error}
    />
  )
}
