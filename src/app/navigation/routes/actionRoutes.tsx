import React from 'react'
import {NonScalingHeaderTitle} from '../../../components/ui'
import {ActionStackParams, StackNavigationRoutes} from '../types'

export const actionRoutes: StackNavigationRoutes<ActionStackParams> = {
  reportIssue: {
    name: 'ReportIssue',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
}
