import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type OpenWasteContainerStackParams = {
  OpenWasteContainerHome: undefined
}

export const openWasteContainerRoutes: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  'home'
> = {
  home: {
    name: 'OpenWasteContainerHome',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Open GFE container" />,
    },
  },
}
