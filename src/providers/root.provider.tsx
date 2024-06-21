import {ReactNode} from 'react'
import {AppInsights} from '@/app/AppInsights'
import {DeviceProvider} from '@/providers/device.provider'
import {PiwikProvider} from '@/providers/piwik.provider'
import {StoreProvider} from '@/providers/store.provider'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => (
  <StoreProvider>
    <DeviceProvider>
      <AppInsights />
      <PiwikProvider>{children}</PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
