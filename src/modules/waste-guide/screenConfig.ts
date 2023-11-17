import {StackNavigationRoutes} from '@/app/navigation/types'
import {UserScreen} from '@/modules/user/screens/User.screen'
import {
  WasteGuideModalParams,
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {WasteGuideScreen} from '@/modules/waste-guide/screens/WasteGuide.screen'
import {WasteGuideFeedbackScreen} from '@/modules/waste-guide/screens/WasteGuideFeedback.screen'

export const screenConfig: StackNavigationRoutes<
  WasteGuideStackParams,
  WasteGuideRouteName
> = {
  [WasteGuideRouteName.wasteGuide]: {
    component: WasteGuideScreen,
    name: WasteGuideRouteName.wasteGuide,
    options: {
      headerTitle: 'Afvalwijzer',
    },
  },
  [WasteGuideRouteName.wasteGuideFeedback]: {
    component: WasteGuideFeedbackScreen,
    name: WasteGuideRouteName.wasteGuideFeedback,
    options: {
      headerTitle: 'Melding afvalinformatie doen',
    },
  },
  [WasteGuideRouteName.user]: {
    component: UserScreen,
    name: WasteGuideRouteName.user,
    options: {
      headerTitle: 'Mijn profiel',
    },
  },
}

export const wasteGuideModals: StackNavigationRoutes<WasteGuideModalParams> = {}
