import {ReactNode} from 'react'
import {DeviceProvider} from '@/providers/device.provider'
import {PiwikProvider} from '@/providers/piwik.provider'
import {StoreProvider} from '@/providers/store.provider'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => (
  <StoreProvider>
    <DeviceProvider>
      <PiwikProvider>{children}</PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
