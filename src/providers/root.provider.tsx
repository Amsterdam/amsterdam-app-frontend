import React from 'react'

import {useNotifee} from '../hooks'
import {SettingsProvider} from './settings.provider'
import {AddressProvider, DeviceProvider} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
  useNotifee()
  return (
    <DeviceProvider>
      <AddressProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AddressProvider>
    </DeviceProvider>
  )
}
