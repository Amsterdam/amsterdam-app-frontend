import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type CityOfficesStackParams = {
  CityOfficesHome: undefined
}

export const cityOfficesRoutes: StackNavigationRoutes<
  CityOfficesStackParams,
  'home'
> = {
  home: {
    name: 'CityOfficesHome',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Stadsloket" />,
    },
  },
}
