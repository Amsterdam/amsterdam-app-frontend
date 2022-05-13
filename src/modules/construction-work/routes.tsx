import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type ConstructionWorkStackParams = {
  ConstructionWorkHome: undefined
}

export const constructionWorkRoutes: StackNavigationRoutes<
  ConstructionWorkStackParams,
  'home'
> = {
  home: {
    name: 'ConstructionWorkHome',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Werk in uitvoering" />,
    },
  },
}
