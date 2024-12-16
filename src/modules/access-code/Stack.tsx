import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {setAccessCodeScreenConfig} from '@/modules/access-code/screenConfig'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'

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
          {Object.entries(setAccessCodeScreenConfig).map(([key, route]) => (
            <Stack.Screen
              key={key}
              {...route}
            />
          ))}
        </>
      )}
    </Stack.Navigator>
  )
}
