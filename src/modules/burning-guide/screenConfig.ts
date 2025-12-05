import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type BurningGuideStackParams,
  BurningGuideRouteName,
} from '@/modules/burning-guide/routes'
import {BurningGuideScreen} from '@/modules/burning-guide/screens/BurningGuide.screen'
import {BurningGuideCodeInfoScreen} from '@/modules/burning-guide/screens/BurningGuideCodeInfo.screen'
import {BurningGuideNuisanceScreen} from '@/modules/burning-guide/screens/BurningGuideNuisance.screen'
import {BurningGuideRisksScreen} from '@/modules/burning-guide/screens/BurningGuideRisks.screen'
import {BurningGuideTipsScreen} from '@/modules/burning-guide/screens/BurningGuideTips.screen'

export const screenConfig: StackNavigationRoutes<
  BurningGuideStackParams,
  BurningGuideRouteName
> = {
  [BurningGuideRouteName.burningGuide]: {
    component: BurningGuideScreen,
    name: BurningGuideRouteName.burningGuide,
    options: {
      headerTitle: 'Stookwijzer',
      headerShown: false,
    },
  },
  [BurningGuideRouteName.burningGuideTips]: {
    component: BurningGuideTipsScreen,
    name: BurningGuideRouteName.burningGuideTips,
    options: {
      headerTitle: 'Houtstook tips',
    },
  },
  [BurningGuideRouteName.burningGuideRisks]: {
    component: BurningGuideRisksScreen,
    name: BurningGuideRouteName.burningGuideRisks,
    options: {
      headerTitle: "Gezondheidsrisico's",
    },
  },
  [BurningGuideRouteName.burningGuideNuisance]: {
    component: BurningGuideNuisanceScreen,
    name: BurningGuideRouteName.burningGuideNuisance,
    options: {
      headerTitle: 'Overlast melden',
    },
  },
  [BurningGuideRouteName.burningGuideCodeInfo]: {
    component: BurningGuideCodeInfoScreen,
    name: BurningGuideRouteName.burningGuideCodeInfo,
    options: {
      headerTitle: 'Uitleg over Code Rood',
    },
  },
}
