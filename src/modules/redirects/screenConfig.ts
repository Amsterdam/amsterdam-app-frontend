import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  RedirectsRouteName,
  RedirectsStackParams,
} from '@/modules/redirects/routes'
import {MakeAppointmentScreen} from '@/modules/redirects/screens/MakeAppointment.screen'
import {RedirectsScreen} from '@/modules/redirects/screens/Redirects.screen'
import {SelectCityScreen} from '@/modules/redirects/screens/SelectCity.screen'

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
