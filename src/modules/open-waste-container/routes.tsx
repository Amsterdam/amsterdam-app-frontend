import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {OpenWasteContainerScreen} from './Screen'

export enum OpenWasteContainerRouteName {
  openWasteContainer = 'OpenWasteContainer',
}

export type OpenWasteContainerStackParams = {
  [OpenWasteContainerRouteName.openWasteContainer]: undefined
}

export const openWasteContainerRoutes: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName
> = {
  [OpenWasteContainerRouteName.openWasteContainer]: {
    component: OpenWasteContainerScreen,
    name: OpenWasteContainerRouteName.openWasteContainer,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Open GFE container" />,
    },
  },
}
