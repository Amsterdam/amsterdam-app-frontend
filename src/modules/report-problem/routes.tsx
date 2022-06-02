import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum ReportProblemRouteName {
  home = 'Home',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.home]: undefined
}

export const reportProblemRoutes: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
  [ReportProblemRouteName.home]: {
    name: ReportProblemRouteName.home,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
}
