import React from 'react'

import {useForegroundPushNotificationHandler} from '../hooks'
import {
  AddressProvider,
  AlertProvider,
  DeviceProvider,
  SettingsProvider,
} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
  useForegroundPushNotificationHandler()
  return (
    <DeviceProvider>
      <AddressProvider>
        <SettingsProvider>
          <AlertProvider>{children}</AlertProvider>
        </SettingsProvider>
      </AddressProvider>
    </DeviceProvider>
  )
}
