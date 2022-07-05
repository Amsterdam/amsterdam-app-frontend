import {StackNavigationRoutes} from '../../app/navigation'
import {OpenWasteContainerScreen} from './Screen'
import {
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from './routes'

export const openWasteContainerScreenConfig: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName
> = {
  [OpenWasteContainerRouteName.openWasteContainer]: {
    component: OpenWasteContainerScreen,
    name: OpenWasteContainerRouteName.openWasteContainer,
    options: {
      headerTitle: 'GFT-container openen',
    },
  },
}
