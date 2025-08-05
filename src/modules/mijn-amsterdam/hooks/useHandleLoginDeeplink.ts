import {useEffect} from 'react'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {LoginResult} from '@/types/navigation'

export const useHandleLoginDeeplink = (loginResult?: LoginResult) => {
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  useEffect(() => {
    if (loginResult === LoginResult.success) {
      setAlert(alerts.loginSuccess)
    } else if (loginResult === LoginResult.failed) {
      setAlert(alerts.loginFailed)
      trackException(ExceptionLogKey.deepLink, 'useHandleLoginDeeplink.ts')
    }
  }, [loginResult, setAlert, trackException])
}
