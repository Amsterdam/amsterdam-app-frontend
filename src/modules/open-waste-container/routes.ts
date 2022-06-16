import {StackNavigationRoutes} from '../../app/navigation'
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
      headerTitle: 'Open GFE container',
    },
  },
}
