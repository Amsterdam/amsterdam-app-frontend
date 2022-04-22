import React, {ReactNode} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {useForegroundPushNotificationHandler} from '../hooks'
import {store} from '../store'
import {defaultLightTheme, ThemeProvider} from '../themes'
import {AlertProvider, DeviceProvider} from '.'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  return (
    <StoreProvider store={store}>
      <ThemeProvider initialTheme={defaultLightTheme}>
        <DeviceProvider>
          <AlertProvider>{children}</AlertProvider>
        </DeviceProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
