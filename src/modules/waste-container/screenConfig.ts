import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  WasteContainerModalName,
  WasteContainerModalParams,
  WasteContainerRouteName,
  WasteContainerStackParams,
} from '@/modules/waste-container/routes'
import {AddWasteCardScreen} from '@/modules/waste-container/screens/AddWasteCard.screen'
import {AddWasteCardSuccessScreen} from '@/modules/waste-container/screens/AddWasteCardSuccess.screen'

export const screenConfig: StackNavigationRoutes<
  WasteContainerStackParams,
  WasteContainerRouteName
> = {
  [WasteContainerRouteName.addWasteCard]: {
    component: AddWasteCardScreen,
    name: WasteContainerRouteName.addWasteCard,
    options: {
      headerTitle: 'Afvalpas toevoegen',
    },
  },
}

export const wasteContainerModals: StackNavigationRoutes<WasteContainerModalParams> =
  {
    [WasteContainerModalName.addWasteCardSuccess]: {
      component: AddWasteCardSuccessScreen,
      name: WasteContainerModalName.addWasteCardSuccess,
    },
  }
