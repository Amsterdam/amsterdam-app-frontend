import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {useShouldShowLoginScreen} from '@/modules/city-pass/hooks/useShouldShowLoginScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {cityPassScreenConfig} from '@/modules/city-pass/screenConfig'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {RestartLoginScreen} from '@/modules/city-pass/screens/RestartLogin.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'

const Stack = createStackNavigator<RootStackParams>()

export const CityPassStack = () => {
  const screenOptions = useScreenOptions()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isLoginStepsActive} = useLoginSteps()
  const {useBiometrics} = useAccessCodeBiometrics()
  const {shouldShowLoginScreen} = useShouldShowLoginScreen()

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isCityPassOwnerRegistered
          ? accessCode
            ? isCodeValid
              ? CityPassRouteName.dashboard
              : attemptsLeft > 0
                ? AccessCodeRouteName.accessCode
                : AccessCodeRouteName.accessCodeInvalid
            : CityPassRouteName.loginSteps
          : CityPassRouteName.login
      }
      screenOptions={screenOptions}>
      {attemptsLeft <= 0 || !!isForgotCode ? (
        <Stack.Screen
          component={RestartLoginScreen}
          name={CityPassRouteName.restartLogin}
          options={{headerTitle: 'Toegangscode vergeten'}}
        />
      ) : isCityPassOwnerRegistered ? (
        accessCode && !isLoginStepsActive ? (
          isCodeValid ? (
            Object.entries(cityPassScreenConfig).map(([key, route]) => (
              <Stack.Screen
                key={key}
                {...route}
              />
            ))
          ) : attemptsLeft > 0 ? (
            useBiometrics === undefined ? (
              <Stack.Screen
                component={BiometricsPermissionScreen}
                name={AccessCodeRouteName.biometricsPermission}
                options={{headerTitle: 'Sneller toegang'}}
              />
            ) : (
              <Stack.Screen
                component={AccessCodeScreen}
                name={AccessCodeRouteName.accessCode}
                options={{headerTitle: 'Toegangscode invoeren'}}
              />
            )
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
              name={CityPassRouteName.loginSteps}
              options={{headerTitle: 'Login'}}
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
          {!!shouldShowLoginScreen && (
            <Stack.Screen
              component={LoginScreen}
              name={CityPassRouteName.login}
              options={{headerTitle: 'Stadspas'}}
            />
          )}
          <Stack.Screen
            component={LoginStepsScreen}
            name={CityPassRouteName.loginSteps}
            options={{headerTitle: 'Login'}}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
