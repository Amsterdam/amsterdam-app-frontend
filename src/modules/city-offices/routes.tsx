import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type CityOfficesStackParams = {
  CityOffices: undefined
  MakeAppointment: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
  CityOfficesStackParams,
  'cityOffices' | 'makeAppointment'
> = {
  cityOffices: {
    name: 'CityOffices',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
  makeAppointment: {
    name: 'MakeAppointment',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Maak een afspraak" />,
    },
  },
}
