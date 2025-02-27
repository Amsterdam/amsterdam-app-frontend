import {useCallback, useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

export const useUnsetCodeOnBlur = (type: AccessCodeType) => {
  const navigation = useNavigation()
  const {setCode} = useAccessCode()
  const {setIsCodeConfirmed} = useConfirmAccessCode()
  const {setIsCodeSet} = useSetAccessCode()

  const unsetCode = useCallback(() => {
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

  useEffect(() => {
    const listener = navigation.addListener('blur', unsetCode)

    return () => {
      listener()
    }
  }, [navigation, unsetCode])
}
