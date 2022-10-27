import {StackNavigationRoutes} from '@/app/navigation'
import {WelcomeRouteName, WelcomeStackParams} from '@/modules/welcome/routes'
import {WelcomeScreen} from '@/modules/welcome/screens'

export const screenConfig: StackNavigationRoutes<
  WelcomeStackParams,
  WelcomeRouteName
> = {
  [WelcomeRouteName.welcome]: {
    component: WelcomeScreen,
    name: WelcomeRouteName.welcome,
    options: {
      headerShown: false,
    },
  },
}
