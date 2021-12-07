import React from 'react'
import {SettingsProvider} from './settings.provider'
import {AddressProvider, DeviceProvider} from '.'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <DeviceProvider>
      <AddressProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AddressProvider>
    </DeviceProvider>
  )
}
