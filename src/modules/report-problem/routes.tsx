import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {ReportProblemScreen} from './Screen'

export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
}

export const reportProblemRoutes: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
  [ReportProblemRouteName.reportProblem]: {
    component: ReportProblemScreen,
    name: ReportProblemRouteName.reportProblem,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
}
