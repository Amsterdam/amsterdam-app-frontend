import {StackNavigationRoutes} from '@/app/navigation/types'
import {WasteCardHeaderMenuButton} from '@/modules/waste-container/components/WasteCardHeaderMenuButton'
import {
  WasteContainerModalName,
  WasteContainerModalParams,
  WasteContainerRouteName,
  WasteContainerStackParams,
} from '@/modules/waste-container/routes'
import {AddWasteCardScreen} from '@/modules/waste-container/screens/AddWasteCard.screen'
import {AddWasteCardSuccessScreen} from '@/modules/waste-container/screens/AddWasteCardSuccess.screen'
import {WasteCardScreen} from '@/modules/waste-container/screens/WasteCard.screen'
import {WasteCardHelpScreen} from '@/modules/waste-container/screens/WasteCardHelp.screen'

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
  [WasteContainerRouteName.wasteCard]: {
    component: WasteCardScreen,
    name: WasteContainerRouteName.wasteCard,
    options: {
      headerTitle: 'Afvalpas',
      SideComponent: WasteCardHeaderMenuButton,
    },
  },
  [WasteContainerRouteName.wasteCardHelp]: {
    component: WasteCardHelpScreen,
    name: WasteContainerRouteName.wasteCardHelp,
    options: {
      headerTitle: 'Hulp bij container openen',
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
