import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useSelector} from '@/hooks/redux/useSelector'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeValidScreen} from '@/modules/access-code/screens/AccessCodeValid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {BudgetScreen} from '@/modules/city-pass/screens/Budget.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {LogoutScreen} from '@/modules/city-pass/screens/Logout.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'

const Stack = createStackNavigator<RootStackParams>()

export const CityPassStack = () => {
  const screenOptions = useScreenOptions()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid} = useEnterAccessCode()
  const {isLoginStepsActive} = useLoginSteps()

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={CityPassRouteName.dashboard}
      screenOptions={screenOptions}>
      {!isCityPassOwnerRegistered || !accessCode || isLoginStepsActive ? (
        <>
          <Stack.Group>
            <Stack.Screen
              component={LoginScreen}
              name={CityPassRouteName.login}
              options={{headerTitle: 'Stadspas'}}
            />
            <Stack.Screen
              component={LoginStepsScreen}
              name={CityPassRouteName.loginSteps}
              options={{headerTitle: 'Login'}}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              component={SetAccessCodeScreen}
              name={AccessCodeRouteName.setAccessCode}
              options={{headerTitle: 'Toegangscode kiezen'}}
            />
            <Stack.Screen
              component={BiometricsPermissionScreen}
              name={AccessCodeRouteName.biometricsPermission}
              options={{headerTitle: 'Sneller toegang'}}
            />
            <Stack.Screen
              component={ConfirmAccessCodeScreen}
              name={AccessCodeRouteName.confirmAccessCode}
              options={{headerTitle: 'Toegangscode herhalen'}}
            />
            <Stack.Screen
              component={AccessCodeValidScreen}
              name={AccessCodeRouteName.validAccessCode}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          {!isCodeValid && !!accessCode ? (
            <>
              {attemptsLeft > 0 ? (
                <Stack.Screen
                  component={AccessCodeScreen}
                  name={AccessCodeRouteName.accessCode}
                  options={{headerTitle: 'Toegangscode invoeren'}}
                />
              ) : (
                <Stack.Screen
                  component={AccessCodeInvalidScreen}
                  name={AccessCodeRouteName.accessCodeInvalid}
                />
              )}
            </>
          ) : (
            <>
              <Stack.Screen
                component={DashboardScreen}
                name={CityPassRouteName.dashboard}
                options={{headerTitle: 'Stadspas'}}
              />
              <Stack.Screen
                component={CityPassDetailsScreen}
                name={CityPassRouteName.cityPassDetails}
                options={{headerTitle: 'Stadspas'}}
              />
              <Stack.Screen
                component={BudgetScreen}
                name={CityPassRouteName.budget}
              />
              <Stack.Screen
                component={LogoutScreen}
                name={CityPassRouteName.cityPassLogout}
                options={{
                  headerTitle: 'Uitloggen',
                }}
              />
              <Stack.Screen
                component={SecurityCodeScreen}
                name={CityPassRouteName.securityCode}
              />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  )
}
