import {StackNavigationRoutes} from '../../app/navigation'
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
      headerTitle: 'Melden',
    },
  },
}
