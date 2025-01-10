import {StackNavigationRoutes} from '@/app/navigation/types'
import {OpenWasteContainerScreen} from '@/modules/open-waste-container/Screen'
import {
  OpenWasteContainerModalParams,
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'
import {AddWasteCardScreen} from '@/modules/open-waste-container/screens/AddWasteCard.screen'

export const screenConfig: StackNavigationRoutes<
  OpenWasteContainerStackParams,
  OpenWasteContainerRouteName
> = {
  [OpenWasteContainerRouteName.addWasteCard]: {
    component: AddWasteCardScreen,
    name: OpenWasteContainerRouteName.addWasteCard,
    options: {
      headerTitle: 'Afvalpas toevoegen',
    },
  },
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
