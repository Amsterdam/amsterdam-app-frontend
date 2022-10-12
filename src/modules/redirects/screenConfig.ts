import {StackNavigationRoutes} from '@/app/navigation'
import {
  RedirectsRouteName,
  RedirectsStackParams,
} from '@/modules/redirects/routes'
import {
  AppointmentOverviewScreen,
  CityOfficeSelectionScreen,
  RedirectsScreen,
} from '@/modules/redirects/screens'

export const screenConfig: StackNavigationRoutes<
  RedirectsStackParams,
  RedirectsRouteName
> = {
  [RedirectsRouteName.appointmentOverview]: {
    component: AppointmentOverviewScreen,
    name: RedirectsRouteName.appointmentOverview,
    options: {
      headerTitle: 'Afspraak maken op Stadsloket',
    },
  },
  [RedirectsRouteName.cityOfficeSelection]: {
    component: CityOfficeSelectionScreen,
    name: RedirectsRouteName.cityOfficeSelection,
    options: {
      headerTitle: 'Afspraak maken op Stadsloket',
    },
  },
  [RedirectsRouteName.redirects]: {
    component: RedirectsScreen,
    name: RedirectsRouteName.redirects,
    options: {
      headerTitle: 'Direct regelen',
    },
  },
}
