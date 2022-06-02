import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum CityOfficesRouteName {
  contact = 'Contact',
  home = 'Home',
  makeAppointment = 'MakeAppointment',
}

export type CityOfficesStackParams = {
  [CityOfficesRouteName.contact]: undefined
  [CityOfficesRouteName.home]: undefined
  [CityOfficesRouteName.makeAppointment]: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
  CityOfficesStackParams,
  CityOfficesRouteName
> = {
  [CityOfficesRouteName.contact]: {
    name: CityOfficesRouteName.contact,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Neem contact op" />,
    },
  },
  [CityOfficesRouteName.home]: {
    name: CityOfficesRouteName.home,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
  [CityOfficesRouteName.makeAppointment]: {
    name: CityOfficesRouteName.makeAppointment,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Maak een afspraak" />,
    },
  },
}
