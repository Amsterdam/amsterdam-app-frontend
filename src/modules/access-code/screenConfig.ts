import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AccessCodeModalName,
  AccessCodeModalParams,
  AccessCodeRouteName,
  AccessCodeStackParams,
} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

export const screenConfig: StackNavigationRoutes<
  AccessCodeStackParams,
  AccessCodeRouteName
> = {
  [AccessCodeRouteName.setAccessCode]: {
    component: SetAccessCodeScreen,
    name: AccessCodeRouteName.setAccessCode,
    options: {
      headerTitle: 'Toegangscode kiezen',
    },
  },
  [AccessCodeRouteName.confirmAccessCode]: {
    component: ConfirmAccessCodeScreen,
    name: AccessCodeRouteName.confirmAccessCode,
    options: {
      headerTitle: 'Toegangscode herhalen',
    },
  },
}

export const accessCodeModals: StackNavigationRoutes<AccessCodeModalParams> = {
  [AccessCodeModalName.accessCode]: {
    component: AccessCodeScreen,
    name: AccessCodeModalName.accessCode,
    options: {
      headerTitle: 'Toegangscode',
    },
  },
}
