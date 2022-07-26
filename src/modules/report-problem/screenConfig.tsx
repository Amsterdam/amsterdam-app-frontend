import {StackNavigationRoutes} from '@/app/navigation'
import {ReportProblemScreen} from '@/modules/report-problem/Screen'
import {
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'

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
