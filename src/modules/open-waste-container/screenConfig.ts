import {StackNavigationRoutes} from '@/app/navigation/types'
import {OpenWasteContainerScreen} from '@/modules/open-waste-container/Screen'
import {
  OpenWasteContainerModalParams,
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'

export const screenConfig: StackNavigationRoutes<
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
