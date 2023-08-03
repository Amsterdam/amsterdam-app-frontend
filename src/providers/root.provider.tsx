import {ReactNode} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {DeviceProvider} from '@/providers/device.provider'
import {PiwikProvider} from '@/providers/piwik.provider'
import {store} from '@/store/store'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => (
  <StoreProvider store={store}>
    <DeviceProvider>
      <PiwikProvider>{children}</PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
