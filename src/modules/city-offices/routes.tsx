import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
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
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
  [CityOfficesRouteName.contact]: {
    component: ContactScreen,
    name: CityOfficesRouteName.contact,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Neem contact op" />,
    },
  },
  [CityOfficesRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: CityOfficesRouteName.makeAppointment,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Maak een afspraak" />,
    },
  },
}
