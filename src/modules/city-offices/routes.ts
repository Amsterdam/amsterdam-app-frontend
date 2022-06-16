import {StackNavigationRoutes} from '../../app/navigation'
import {ContactScreen} from '../contact/Screen'
import {CityOfficesScreen, MakeAppointmentScreen} from './screens'

export enum CityOfficesRouteName {
  cityOffices = 'CityOffices',
  contact = 'Contact',
  makeAppointment = 'MakeAppointment',
}

export type CityOfficesStackParams = {
  [CityOfficesRouteName.cityOffices]: undefined
  [CityOfficesRouteName.contact]: undefined
  [CityOfficesRouteName.makeAppointment]: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
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
