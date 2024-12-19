import notifee from '@notifee/react-native'
import {useEffect, useRef} from 'react'
import {useModules} from '@/hooks/useModules'
import {store} from '@/store/store'

export const HandleNotificationEvent = () => {
  const {enabledModules} = useModules()
  const enabledModulesRef = useRef(enabledModules)

  enabledModulesRef.current = enabledModules

  useEffect(() => {
    const removeListener = notifee.onForegroundEvent(({type, detail}) => {
      enabledModulesRef.current
        ?.find(module => module.slug === detail.notification?.data?.module)
        ?.onNotificationEvent?.(type, detail, store.dispatch)

      return Promise.resolve()
    })

    notifee.onBackgroundEvent(({type, detail}) => {
      enabledModulesRef.current
        ?.find(module => module.slug === detail.notification?.data?.module)
        ?.onNotificationEvent?.(type, detail, store.dispatch)

      return Promise.resolve()
    })

    return removeListener
  }, [])

  return null
}
