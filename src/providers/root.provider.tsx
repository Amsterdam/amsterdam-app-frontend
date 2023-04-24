import {ReactNode} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {useForegroundPushNotificationHandler} from '@/hooks'
import {DeviceProvider} from '@/providers'
import {PiwikProvider} from '@/providers'
import {store} from '@/store'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  return (
    <StoreProvider store={store}>
      <DeviceProvider>
        <PiwikProvider>{children}</PiwikProvider>
      </DeviceProvider>
    </StoreProvider>
  )
}
