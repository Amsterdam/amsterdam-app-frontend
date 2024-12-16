import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeValidScreen} from '@/modules/access-code/screens/AccessCodeValid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

const Stack = createStackNavigator<RootStackParams>()

export const AccessCodeStack = () => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid} = useEnterAccessCode()
  const screenOptions = useScreenOptions()

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={AccessCodeRouteName.setAccessCode}
      screenOptions={screenOptions}>
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
        </>
      )}
    </Stack.Navigator>
  )
}
