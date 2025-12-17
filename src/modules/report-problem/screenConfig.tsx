import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {screenOptions} from '@/modules/report-problem/screenOptions'
import {ReportProblemScreen} from '@/modules/report-problem/screens/ReportProblem.screen'
import {ReportProblemWebViewScreen} from '@/modules/report-problem/screens/ReportProblemWebView.screen'

export const screenConfig: StackNavigationRoutes<
  ReportProblemStackParams,
  ReportProblemRouteName
> = {
  [ReportProblemRouteName.reportProblem]: {
    component: ReportProblemScreen,
    name: ReportProblemRouteName.reportProblem,
    options: screenOptions,
  },
  [ReportProblemRouteName.reportProblemWebView]: {
    component: ReportProblemWebViewScreen,
    name: ReportProblemRouteName.reportProblemWebView,
    options: {
      ...screenOptions,
      gestureEnabled: false,
      headerShown: false,
    },
  },
}

export const reportProblemModals: StackNavigationRoutes<ReportProblemModalParams> =
  {}
