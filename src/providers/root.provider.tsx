import React from 'react'
import {Provider} from 'react-redux'

import {useForegroundPushNotificationHandler} from '../hooks'
import {store} from '../store'
import {AlertProvider, DeviceProvider, SettingsProvider} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
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
