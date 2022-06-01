import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum OpenWasteContainerRouteName {
  home = 'Home',
}

export type OpenWasteContainerStackParams = {
  [OpenWasteContainerRouteName.home]: undefined
}

export const openWasteContainerRoutes: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName
> = {
  [OpenWasteContainerRouteName.home]: {
    name: OpenWasteContainerRouteName.home,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Open GFE container" />,
    },
  },
}
