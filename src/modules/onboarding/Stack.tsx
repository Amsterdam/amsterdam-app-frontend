import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {screenConfig} from '@/modules/onboarding/screenConfig'

const Stack = createStackNavigator()

export const OnboardingStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={OnboardingRouteName.onboarding}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
