import {StackNavigationRoutes} from '@/app/navigation/types'
import {HeaderLogo} from '@/modules/home/components/HeaderLogo'
import {HeaderNavigation} from '@/modules/home/components/HeaderNavigation'
import {
  HomeModalParams,
  HomeRouteName,
  HomeStackParams,
} from '@/modules/home/routes'
import {AdminScreen} from '@/modules/home/screens/Admin.screen'
import {HomeScreen} from '@/modules/home/screens/Home.screen'
import {SettingsScreen} from '@/modules/home/screens/Settings.screen'

export const screenConfig: StackNavigationRoutes<
  HomeStackParams,
  HomeRouteName
> = {
  [HomeRouteName.admin]: {
    component: AdminScreen,
    name: HomeRouteName.admin,
    options: {
      headerTitle: 'Omgeving selecteren',
    },
  },
  [HomeRouteName.home]: {
    component: HomeScreen,
    name: HomeRouteName.home,
    options: {
      headerLeft: () => <HeaderLogo />,
      headerRight: () => <HeaderNavigation />,
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

export const homeModals: StackNavigationRoutes<HomeModalParams> = {}
