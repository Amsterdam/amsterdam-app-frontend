import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ElectionsStackParams,
  ElectionsRouteName,
} from '@/modules/elections/routes'
import {ElectionsScreen} from '@/modules/elections/screens/Elections.screen'

export const screenConfig: StackNavigationRoutes<
  ElectionsStackParams,
  ElectionsRouteName
> = {
  [ElectionsRouteName.elections]: {
    component: ElectionsScreen,
    name: ElectionsRouteName.elections,
    options: {
      headerShown: false,
      headerTitle: 'Stembureaus',
    },
  },
}
