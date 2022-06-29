import {StackNavigationRoutes} from '../../app/navigation'
import {OpenWasteContainerScreen} from './Screen'
import {
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName,
} from './routes'

export const openWasteContainerScreenConfig: StackNavigationRoutes<
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
