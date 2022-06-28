import {StackNavigationRoutes} from '../../app/navigation'
import {ContactScreen} from '../contact/Screen'
import {CityOfficesStackParams, CityOfficesRouteName} from './routes'
import {CityOfficesScreen, MakeAppointmentScreen} from './screens'

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
