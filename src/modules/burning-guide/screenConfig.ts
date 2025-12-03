import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type BurningGuideStackParams,
  BurningGuideRouteName,
} from '@/modules/burning-guide/routes'
import {BurningGuideScreen} from '@/modules/burning-guide/screens/BurningGuide.screen'
import {BurningGuideCodeOrangeScreen} from '@/modules/burning-guide/screens/BurningGuideCodeOrange.screen'
import {BurningGuideCodeRedScreen} from '@/modules/burning-guide/screens/BurningGuideCodeRed.screen'
import {BurningGuideCodeYellowScreen} from '@/modules/burning-guide/screens/BurningGuideCodeYellow.screen'
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
  [BurningGuideRouteName.burningGuideCodeRed]: {
    component: BurningGuideCodeRedScreen,
    name: BurningGuideRouteName.burningGuideCodeRed,
    options: {
      headerTitle: 'Uitleg over Code Rood',
    },
  },
  [BurningGuideRouteName.burningGuideCodeOrange]: {
    component: BurningGuideCodeOrangeScreen,
    name: BurningGuideRouteName.burningGuideCodeOrange,
    options: {
      headerTitle: 'Uitleg over Code Oranje',
    },
  },
  [BurningGuideRouteName.burningGuideCodeYellow]: {
    component: BurningGuideCodeYellowScreen,
    name: BurningGuideRouteName.burningGuideCodeYellow,
    options: {
      headerTitle: 'Uitleg over Code Geel',
    },
  },
}
