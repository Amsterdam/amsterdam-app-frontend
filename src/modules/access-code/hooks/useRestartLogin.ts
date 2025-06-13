import {useState, useCallback} from 'react'
import {useStore} from '@/hooks/redux/useStore'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {clientModules} from '@/modules/modules'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export const useRestartLogin = () => {
  const [isError, setIsError] = useState<boolean>()
  const {resetAccessCode} = useAccessCode()
  const trackException = useTrackException()
  const store = useStore()

  const onRestartLogin = useCallback(async () => {
    try {
      setIsError(false)
      await Promise.all(
        clientModules.map(module =>
          module.logout?.(store.dispatch, store.getState()),
        ),
      )
      await resetAccessCode()
    } catch (e) {
      setIsError(true)
      trackException(
        ExceptionLogKey.resetLoginsAfterInvalidAccessCode,
        'useRestartLogin.ts',
        {error: e},
      )
    }
  }, [resetAccessCode, store, trackException])

  return {isError, onRestartLogin}
}
