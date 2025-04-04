import {useCallback} from 'react'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

export const useUnsetCode = (type: AccessCodeType) => {
  const {setCode} = useAccessCode()
  const {setIsCodeConfirmed} = useConfirmAccessCode()
  const {setIsCodeSet} = useSetAccessCode()

  return useCallback(() => {
    switch (type) {
      case AccessCodeType.codeConfirmed:
        setIsCodeConfirmed(false)
        break
      case AccessCodeType.codeSet:
        setIsCodeSet(false)
        break
    }

    setCode({code: [], type})
  }, [setCode, setIsCodeConfirmed, setIsCodeSet, type])
}
