import React, {ReactNode} from 'react'
import {Provider} from 'react-redux'

import {useForegroundPushNotificationHandler} from '../hooks'
import {store} from '../store'
import {AlertProvider, DeviceProvider, SettingsProvider} from '.'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => {
  useForegroundPushNotificationHandler()
  return (
    <Provider store={store}>
      <DeviceProvider>
        <SettingsProvider>
          <AlertProvider>{children}</AlertProvider>
        </SettingsProvider>
      </DeviceProvider>
    </Provider>
  )
}
