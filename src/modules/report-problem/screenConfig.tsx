import {ReportProblemScreen} from './Screen'
import {ReportProblemRouteName, ReportProblemStackParams} from './routes'
import {StackNavigationRoutes} from '@/app/navigation'

export const reportProblemScreenConfig: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
  [ReportProblemRouteName.reportProblem]: {
    component: ReportProblemScreen,
    name: ReportProblemRouteName.reportProblem,
    options: {
      headerTitle: 'Melding doen',
    },
  },
}
