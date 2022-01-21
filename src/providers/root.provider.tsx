import React from 'react'

import {useForegroundPushNotificationHandler} from '../hooks'
import {AlertProvider, DeviceProvider, SettingsProvider} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
  useForegroundPushNotificationHandler()
  return (
    <DeviceProvider>
      <SettingsProvider>
        <AlertProvider>{children}</AlertProvider>
      </SettingsProvider>
    </DeviceProvider>
  )
}
