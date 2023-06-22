import {StackNavigationRoutes} from '@/app/navigation'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ReportProblemWebViewScreen} from '@/modules/report-problem/screens/ReportProblemWebView.screen'

export const screenConfig: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
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
