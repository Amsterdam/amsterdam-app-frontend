import {ReactNode} from 'react'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {DeviceProvider} from '@/providers/device.provider'
import {PiwikProvider} from '@/providers/piwik.provider'
import {StoreProvider} from '@/providers/store.provider'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => (
  <StoreProvider>
    <DeviceProvider>
      <PiwikProvider>
        <KeyboardProvider>{children}</KeyboardProvider>
      </PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
