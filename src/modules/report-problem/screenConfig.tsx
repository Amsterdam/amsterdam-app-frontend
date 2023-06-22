import {StackNavigationRoutes} from '@/app/navigation'
import {ReportProblemWebViewScreen} from '@/modules/report-problem/Screen'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'

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
