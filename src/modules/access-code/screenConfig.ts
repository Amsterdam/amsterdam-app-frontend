import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AccessCodeRouteName,
  AccessCodeStackParams,
} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeLoginScreen} from '@/modules/access-code/screens/AccessCodeLogin.screen'
import {AccessCodeValidScreen} from '@/modules/access-code/screens/AccessCodeValid.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

export const screenConfig: StackNavigationRoutes<
  AccessCodeStackParams,
  AccessCodeRouteName
> = {
  [AccessCodeRouteName.accessCode]: {
    component: AccessCodeScreen,
    name: AccessCodeRouteName.accessCode,
    options: {
      headerTitle: 'Toegangscode invoeren',
    },
  },
  [AccessCodeRouteName.accessCodeInvalid]: {
    component: AccessCodeInvalidScreen,
    name: AccessCodeRouteName.accessCodeInvalid,
  },
  [AccessCodeRouteName.accessCodeLogin]: {
    component: AccessCodeLoginScreen,
    name: AccessCodeRouteName.accessCodeLogin,
    options: {
      headerTitle: 'Inloggen',
    },
  },
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
  [AccessCodeRouteName.validAccessCode]: {
    component: AccessCodeValidScreen,
    name: AccessCodeRouteName.validAccessCode,
  },
}
