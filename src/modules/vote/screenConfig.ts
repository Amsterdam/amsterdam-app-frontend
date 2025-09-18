import {StackNavigationRoutes} from '@/app/navigation/types'
import {VoteStackParams, VoteRouteName} from '@/modules/vote/routes'
import {VoteScreen} from '@/modules/vote/screens/Vote.screen'

export const screenConfig: StackNavigationRoutes<
  VoteStackParams,
  VoteRouteName
> = {
  [VoteRouteName.vote]: {
    component: VoteScreen,
    name: VoteRouteName.vote,
    options: {
      headerShown: false,
      headerTitle: 'Stembureaus',
    },
  },
}
