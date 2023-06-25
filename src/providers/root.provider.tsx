import {ReactNode} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {DeviceProvider} from '@/providers'
import {PiwikProvider} from '@/providers'
import {AppStore} from '@/store/types'

type Props = {
  children: ReactNode
  store: AppStore
}

export const RootProvider = ({children, store}: Props) => (
  <StoreProvider store={store}>
    <DeviceProvider>
      <PiwikProvider>{children}</PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
