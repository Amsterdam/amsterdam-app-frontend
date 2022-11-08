import {StackNavigationRoutes} from '@/app/navigation'
import {
  RedirectsRouteName,
  RedirectsStackParams,
} from '@/modules/redirects/routes'
import {
  MakeAppointmentScreen,
  RedirectsScreen,
  SelectCityScreen,
} from '@/modules/redirects/screens'

export const screenConfig: StackNavigationRoutes<
  RedirectsStackParams,
  RedirectsRouteName
> = {
  [RedirectsRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: RedirectsRouteName.makeAppointment,
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
  [RedirectsRouteName.selectCity]: {
    component: SelectCityScreen,
    name: RedirectsRouteName.selectCity,
    options: {
      headerTitle: 'Afspraak maken op Stadsloket',
    },
  },
}
