import {useCallback} from 'react'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

export const useUnsetCode = () => {
  const {setCode} = useAccessCode()
  const {setIsCodeConfirmed} = useConfirmAccessCode()
  const {setIsCodeSet} = useSetAccessCode()

  return useCallback(() => {
    setCode({code: [], type: AccessCodeType.codeConfirmed})
    setCode({code: [], type: AccessCodeType.codeSet})
    setIsCodeSet(false)
    setIsCodeConfirmed(false)
  }, [setCode, setIsCodeConfirmed, setIsCodeSet])
}
