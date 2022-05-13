import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type ReportProblemStackParams = {
  ReportProblemHome: undefined
}

export const reportProblemRoutes: StackNavigationRoutes<
  ReportProblemStackParams,
  'home'
> = {
  home: {
    name: 'ReportProblemHome',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
}
