import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {Theme} from '../../themes'

type SettingsStackParams = {
  Settings: undefined
}

const BACKGROUND_COLOR = '#f3f5f7' // TODO Token

export const settingsRoutes: StackNavigationRoutes<
  SettingsStackParams,
  'settings'
> = {
  settings: {
    name: 'Settings',
    options: {
      cardStyle: {
        backgroundColor: BACKGROUND_COLOR,
      },
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
})
