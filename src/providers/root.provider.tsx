import {AnyAction, Store} from '@reduxjs/toolkit'
import {ReactNode} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {DeviceProvider} from '@/providers'
import {PiwikProvider} from '@/providers'
import {RootState} from '@/store'

type Props = {
  children: ReactNode
  store: Store<RootState, AnyAction>
}

export const RootProvider = ({children, store}: Props) => (
  <StoreProvider store={store}>
    <DeviceProvider>
      <PiwikProvider>{children}</PiwikProvider>
    </DeviceProvider>
  </StoreProvider>
)
