import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useSelector} from '@/hooks/redux/useSelector'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {
  cityPassLoginScreenConfig,
  cityPassScreenConfig,
} from '@/modules/city-pass/screenConfig'
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
        Object.entries(cityPassLoginScreenConfig).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        ))
      ) : (
        <>
          {!isCodeValid && !!accessCode ? (
            attemptsLeft > 0 ? (
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
            )
          ) : (
            Object.entries(cityPassScreenConfig).map(([key, route]) => (
              <Stack.Screen
                key={key}
                {...route}
              />
            ))
          )}
        </>
      )}
    </Stack.Navigator>
  )
}
