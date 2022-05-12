import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type SettingsStackParams = {
  Settings: undefined
}

export const settingsRoutes: StackNavigationRoutes<
  SettingsStackParams,
  'settings'
> = {
  settings: {
    name: 'Settings',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen Module" />,
    },
  },
}
