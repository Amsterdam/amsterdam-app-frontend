import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AccessCodeRouteName,
  AccessCodeStackParams,
} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeValidScreen} from '@/modules/access-code/screens/AccessCodeValid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

export const enterAccessCodeScreenConfig: StackNavigationRoutes<
  AccessCodeStackParams,
  AccessCodeRouteName.accessCode | AccessCodeRouteName.accessCodeInvalid
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
}

export const setAccessCodeScreenConfig: StackNavigationRoutes<
  AccessCodeStackParams,
  | AccessCodeRouteName.biometricsPermission
  | AccessCodeRouteName.setAccessCode
  | AccessCodeRouteName.confirmAccessCode
  | AccessCodeRouteName.validAccessCode
> = {
  [AccessCodeRouteName.biometricsPermission]: {
    component: BiometricsPermissionScreen,
    name: AccessCodeRouteName.biometricsPermission,
    options: {
      headerTitle: 'Sneller toegang',
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
