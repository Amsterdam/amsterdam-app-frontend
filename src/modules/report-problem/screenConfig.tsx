import {StackNavigationRoutes} from '@/app/navigation'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ReportProblemScreen} from '@/modules/report-problem/screens/ReportProblem.screen'
import {ReportProblemWebViewScreen} from '@/modules/report-problem/screens/ReportProblemWebView.screen'

const options = {
  headerTitle: 'Melding doen',
}

export const screenConfig: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
  [ReportProblemRouteName.reportProblem]: {
    component: ReportProblemScreen,
    name: ReportProblemRouteName.reportProblem,
    options,
  },
  [ReportProblemRouteName.reportProblemWebView]: {
    component: ReportProblemWebViewScreen,
    name: ReportProblemRouteName.reportProblemWebView,
    options,
  },
}

export const reportProblemModals: StackNavigationRoutes<ReportProblemModalParams> =
  {}
