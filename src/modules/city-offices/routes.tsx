import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type CityOfficesStackParams = {
  CityOffices: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
  CityOfficesStackParams,
  'cityOffices'
> = {
  cityOffices: {
    name: 'CityOffices',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
}
