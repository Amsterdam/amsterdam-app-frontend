import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type BurningGuideModalParams,
  type BurningGuideStackParams,
  BurningGuideRouteName,
} from '@/modules/burning-guide/routes'
import {BurningGuideScreen} from '@/modules/burning-guide/screens/BurningGuide.screen'

export const screenConfig: StackNavigationRoutes<
  BurningGuideStackParams,
  BurningGuideRouteName
> = {
  [BurningGuideRouteName.burningGuide]: {
    component: BurningGuideScreen,
    name: BurningGuideRouteName.burningGuide,
    options: {
      headerTitle: 'Stookwijzer',
    },
  },
}

export const burningGuideModals: StackNavigationRoutes<BurningGuideModalParams> =
  {}
