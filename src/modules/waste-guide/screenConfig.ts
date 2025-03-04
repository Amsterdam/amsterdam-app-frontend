import {StackNavigationRoutes} from '@/app/navigation/types'
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
      headerShown: false,
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
}

export const wasteGuideModals: StackNavigationRoutes<WasteGuideModalParams> = {}
