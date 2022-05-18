import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {Theme} from '../../themes'

type SettingsStackParams = {
  Settings: undefined
}

export const settingsRoutes: (
  theme: Theme,
) => StackNavigationRoutes<SettingsStackParams, 'settings'> = ({color}) => ({
  settings: {
    name: 'Settings',
    options: {
      cardStyle: {
        backgroundColor: color.screen.background.settings,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
})
