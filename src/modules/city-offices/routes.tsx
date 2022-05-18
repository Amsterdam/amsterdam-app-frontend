import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type CityOfficesStackParams = {
  CityOffices: undefined
  Contact: undefined
  MakeAppointment: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
  CityOfficesStackParams,
  'cityOffices' | 'contact' | 'makeAppointment'
> = {
  cityOffices: {
    name: 'CityOffices',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
  contact: {
    name: 'Contact',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Neem contact op" />,
    },
  },
  makeAppointment: {
    name: 'MakeAppointment',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Maak een afspraak" />,
    },
  },
}
