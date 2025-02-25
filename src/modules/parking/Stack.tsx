import {TransitionPresets} from '@react-navigation/stack'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {useShouldShowIntroScreen} from '@/modules/parking/hooks/useShouldShowIntroScreen'
import {ParkingRouteName} from '@/modules/parking/routes'
import {LoginStepsScreen} from '@/modules/parking/screens/LoginSteps.screen'
import {ParkingDashboardScreen} from '@/modules/parking/screens/ParkingDashBoard.screen'
import {ParkingIntroScreen} from '@/modules/parking/screens/ParkingIntro.screen'
import {ParkingLoginScreen} from '@/modules/parking/screens/ParkingLogin.screen'
import {RestartLoginScreen} from '@/modules/parking/screens/RestartLogin.screen'
import {SecureItemKey} from '@/utils/secureStorage'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const {isLoginStepsActive} = useLoginSteps()
  const {shouldShowIntroScreen} = useShouldShowIntroScreen()
  const {item: securePermitHolder} = useGetSecureItem(
    SecureItemKey.parkingPermitHolder,
  )
  const {item: secureVisitor} = useGetSecureItem(SecureItemKey.parkingVisitor)
  const screenOptions = useScreenOptions()

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {attemptsLeft <= 0 || !!isForgotCode ? (
        <Stack.Screen
          component={RestartLoginScreen}
          name={ParkingRouteName.restartLogin}
          options={{headerTitle: 'Toegangscode vergeten'}}
        />
      ) : useBiometrics === undefined && isEnrolled && isCodeValid ? (
        <Stack.Screen
          component={BiometricsPermissionScreen}
          name={AccessCodeRouteName.biometricsPermission}
          options={{
            headerTitle: 'Sneller toegang',
          }}
        />
      ) : securePermitHolder || secureVisitor ? (
        accessCode && !isLoginStepsActive ? (
          isCodeValid ? (
            <Stack.Screen
              component={ParkingDashboardScreen}
              name={ParkingRouteName.dashboard}
            />
          ) : attemptsLeft > 0 ? (
            <Stack.Screen
              component={AccessCodeScreen}
              name={AccessCodeRouteName.accessCode}
              options={{
                headerTitle: 'Toegangscode invoeren',
                ...TransitionPresets.ModalFadeTransition,
              }}
            />
          ) : (
            <Stack.Screen
              component={AccessCodeInvalidScreen}
              name={AccessCodeRouteName.accessCodeInvalid}
            />
          )
        ) : (
          <>
            <Stack.Screen
              component={LoginStepsScreen}
              name={ParkingRouteName.loginSteps}
              options={{headerTitle: 'Inloggen'}}
            />
            <Stack.Screen
              component={SetAccessCodeScreen}
              name={AccessCodeRouteName.setAccessCode}
              options={{headerTitle: 'Toegangscode kiezen'}}
            />
            <Stack.Screen
              component={ConfirmAccessCodeScreen}
              name={AccessCodeRouteName.confirmAccessCode}
              options={{headerTitle: 'Toegangscode herhalen'}}
            />
          </>
        )
      ) : (
        <>
          {shouldShowIntroScreen ? (
            <>
              <Stack.Screen
                component={ParkingIntroScreen}
                name={ParkingRouteName.intro}
              />
              <Stack.Screen
                component={ParkingLoginScreen}
                name={ParkingRouteName.login}
              />
            </>
          ) : (
            <Stack.Screen
              component={ParkingLoginScreen}
              name={ParkingRouteName.login}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  )
}
