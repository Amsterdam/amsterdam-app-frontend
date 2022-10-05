import {StackNavigationRoutes} from '@/app/navigation'
import {
  RedirectsRouteName,
  RedirectsStackParams,
} from '@/modules/redirects/routes'
import {RedirectsScreen} from '@/modules/redirects/screens'

export const screenConfig: StackNavigationRoutes<
  RedirectsStackParams,
  RedirectsRouteName
> = {
  [RedirectsRouteName.redirects]: {
    component: RedirectsScreen,
    name: RedirectsRouteName.redirects,
    options: {
      headerTitle: 'Direct regelen',
    },
  },
}
