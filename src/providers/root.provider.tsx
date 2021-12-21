import React from 'react'

import {useForegroundPushNotificationHandler} from '../hooks'
import {SettingsProvider} from './settings.provider'
import {AddressProvider, DeviceProvider} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
  useForegroundPushNotificationHandler()
  return (
    <DeviceProvider>
      <AddressProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AddressProvider>
    </DeviceProvider>
  )
}
