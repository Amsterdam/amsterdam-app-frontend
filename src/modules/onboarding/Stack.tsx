import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {screenConfig} from '@/modules/onboarding/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const OnboardingStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={OnboardingRouteName.onboarding}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
