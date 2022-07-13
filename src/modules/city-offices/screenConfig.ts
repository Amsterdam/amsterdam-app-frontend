import {StackNavigationRoutes} from '@/app/navigation'
import {
  CityOfficesRouteName,
  CityOfficesStackParams,
} from '@/modules/city-offices/routes'
import {
  CityOfficesScreen,
  MakeAppointmentScreen,
} from '@/modules/city-offices/screens'
import {ContactScreen} from '@/modules/contact/Screen'

export const cityOfficesScreenConfig: StackNavigationRoutes<
  CityOfficesStackParams,
  CityOfficesRouteName
> = {
  [CityOfficesRouteName.cityOffices]: {
    component: CityOfficesScreen,
    name: CityOfficesRouteName.cityOffices,
    options: {
      headerTitle: 'Stadsloket',
    },
  },
  [CityOfficesRouteName.contact]: {
    component: ContactScreen,
    name: CityOfficesRouteName.contact,
    options: {
      headerTitle: 'Neem contact op',
    },
  },
  [CityOfficesRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: CityOfficesRouteName.makeAppointment,
    options: {
      headerTitle: 'Maak een afspraak',
    },
  },
}
