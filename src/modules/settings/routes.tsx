import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {Theme} from '../../themes'

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
      cardStyle: {
        backgroundColor: '#f3f5f7', // TODO Token
      },
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
})
