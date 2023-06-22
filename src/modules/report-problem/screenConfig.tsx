import {StackNavigationRoutes} from '@/app/navigation'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ReportProblemScreen} from '@/modules/report-problem/screens/ReportProblem.screen'
import {ReportProblemWebViewScreen} from '@/modules/report-problem/screens/ReportProblemWebView.screen'

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
  [ReportProblemRouteName.reportProblemWebView]: {
    component: ReportProblemWebViewScreen,
    name: ReportProblemRouteName.reportProblemWebView,
    options: {
      headerTitle: 'Melding doen',
    },
  },
}

export const reportProblemModals: StackNavigationRoutes<ReportProblemModalParams> =
  {}
