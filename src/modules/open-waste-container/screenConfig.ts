import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  OpenWasteContainerModalName,
  OpenWasteContainerModalParams,
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'
import {AddWasteCardScreen} from '@/modules/open-waste-container/screens/AddWasteCard.screen'
import {AddWasteCardSuccessScreen} from '@/modules/open-waste-container/screens/AddWasteCardSuccess.screen'

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
}

export const openWasteContainerModals: StackNavigationRoutes<OpenWasteContainerModalParams> =
  {
    [OpenWasteContainerModalName.addWasteCardSuccess]: {
      component: AddWasteCardSuccessScreen,
      name: OpenWasteContainerModalName.addWasteCardSuccess,
    },
  }
