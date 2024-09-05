import {StackNavigationRoutes} from '@/app/navigation/types'
import {HeaderForHome} from '@/modules/home/components/HeaderForHome'
import {
  HomeModalName,
  HomeModalParams,
  HomeRouteName,
  HomeStackParams,
} from '@/modules/home/routes'
import {AdminScreen} from '@/modules/home/screens/Admin.screen'
import {HomeScreen} from '@/modules/home/screens/Home.screen'
import {PermissionInstructionsScreen} from '@/modules/home/screens/PermissionInstructions.screen'
import {SettingsScreen} from '@/modules/home/screens/Settings.screen'

export const screenConfig: StackNavigationRoutes<
  HomeStackParams,
  HomeRouteName
> = {
  [HomeRouteName.admin]: {
    component: AdminScreen,
    name: HomeRouteName.admin,
    options: {
      headerTitle: 'Admin',
    },
  },
  [HomeRouteName.home]: {
    component: HomeScreen,
    name: HomeRouteName.home,
    options: {
      header: () => <HeaderForHome />,
      headerTitle: '',
    },
  },
  [HomeRouteName.settings]: {
    component: SettingsScreen,
    name: HomeRouteName.settings,
    options: {
      headerTitle: 'Instellingen',
    },
  },
}

export const homeModals: StackNavigationRoutes<HomeModalParams> = {
  [HomeModalName.permissionInstructions]: {
    component: PermissionInstructionsScreen,
    name: HomeModalName.permissionInstructions,
  },
}
