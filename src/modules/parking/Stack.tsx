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
import {useShouldShowLoginScreen} from '@/modules/parking/hooks/useShouldShowLoginScreen'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingScreenConfig} from '@/modules/parking/screenConfig'
import {LoginStepsScreen} from '@/modules/parking/screens/LoginSteps.screen'
import {ParkingForgotAccessCodeScreen} from '@/modules/parking/screens/ParkingForgotAccessCode.screen'
import {ParkingIntroScreen} from '@/modules/parking/screens/ParkingIntro.screen'
import {ParkingLoginScreen} from '@/modules/parking/screens/ParkingLogin.screen'
import {useParkingAccountIsLoggingIn} from '@/modules/parking/slice'
import {SecureItemKey} from '@/utils/secureStorage'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const {isLoginStepsActive} = useLoginSteps()
  const {shouldShowLoginScreen} = useShouldShowLoginScreen()
  const {item: securePermitHolder, isLoading: isLoadingSecurePermitHolder} =
    useGetSecureItem(SecureItemKey.parkingPermitHolder)
  const {item: secureVisitor, isLoading: isLoadingSecureVisitor} =
    useGetSecureItem(SecureItemKey.parkingVisitor)
  const screenOptions = useScreenOptions()
  const isLoggingIn = useParkingAccountIsLoggingIn()

  if (isLoading || isLoadingSecurePermitHolder || isLoadingSecureVisitor) {
    return null
  }

  let isSecurePermitHolderArray = false
  let isSecureVisitorArray = false

  try {
    isSecurePermitHolderArray = securePermitHolder
      ? Array.isArray(JSON.parse(securePermitHolder))
      : false
  } catch {
    isSecurePermitHolderArray = false
  }

  try {
    isSecureVisitorArray = secureVisitor
      ? Array.isArray(JSON.parse(secureVisitor))
      : false
  } catch {
    isSecureVisitorArray = false
  }

  const hasSecureAccount =
    (securePermitHolder &&
      securePermitHolder !== '[]' &&
      isSecurePermitHolderArray) ||
    (secureVisitor && secureVisitor !== '[]' && isSecureVisitorArray)

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isForgotCode ? (
        <Stack.Screen
          component={ParkingForgotAccessCodeScreen}
          name={ParkingRouteName.forgotAccessCode}
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
      ) : hasSecureAccount ? (
        accessCode && !isLoginStepsActive ? (
          isCodeValid ? (
            <>
              {!!isLoggingIn && (
                <Stack.Screen
                  component={ParkingLoginScreen}
                  name={ParkingRouteName.login}
                  options={{headerTitle: 'Inloggen'}}
                />
              )}
              {Object.entries(parkingScreenConfig).map(([key, route]) => (
                <Stack.Screen
                  key={key}
                  {...route}
                />
              ))}
            </>
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
          {!shouldShowLoginScreen && (
            <Stack.Screen
              component={ParkingIntroScreen}
              name={ParkingRouteName.intro}
              options={{headerTitle: 'Aanmelden parkeren'}}
            />
          )}
          <Stack.Screen
            component={ParkingLoginScreen}
            name={ParkingRouteName.login}
            options={{headerTitle: 'Inloggen'}}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
