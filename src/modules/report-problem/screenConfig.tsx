import {StackNavigationRoutes} from '@/app/navigation'
import {ReportProblemScreen} from '@/modules/report-problem/Screen'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'

export const screenConfig: StackNavigationRoutes<
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

export const reportProblemModals: StackNavigationRoutes<ReportProblemModalParams> =
  {}
