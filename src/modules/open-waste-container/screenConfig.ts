import {StackNavigationRoutes} from '@/app/navigation'
import {OpenWasteContainerScreen} from '@/modules/open-waste-container/Screen'
import {
  OpenWasteContainerModalParams,
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'

export const openWasteContainerScreenConfig: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName
> = {
  [OpenWasteContainerRouteName.openWasteContainer]: {
    component: OpenWasteContainerScreen,
    name: OpenWasteContainerRouteName.openWasteContainer,
    options: {
      headerTitle: 'Gft-container openen',
    },
  },
}

export const openWasteContainerModals: StackNavigationRoutes<OpenWasteContainerModalParams> =
  {}
