import {CardStyleInterpolators} from '@react-navigation/stack'
import {Platform} from 'react-native'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {RootStackParams} from '@/app/navigation/types'
import {clientModules, coreModules} from '@/modules/modules'
import {useHasSeenOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {getModuleStack, modals} from '@/modules/stacks'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator<RootStackParams>()

const moduleStacks = [...coreModules, ...clientModules].map(
  ({screenOptions: options, slug}) => {
    const stack = getModuleStack(slug)

    if (!stack) {
      return null
    }

    return (
      <Stack.Screen
        component={stack}
        key={slug}
        name={slug}
        options={options}
      />
    )
  },
)

const modalStacks = Object.entries(modals).map(([key, route]) => (
  <Stack.Screen
    key={key}
    {...route}
    options={{
      cardStyleInterpolator:
        Platform.OS === 'ios'
          ? CardStyleInterpolators.forModalPresentationIOS
          : undefined,
    }}
  />
))

export const RootStackNavigator = () => {
  const theme = useTheme()
  const hasSeenOnboarding = useHasSeenOnboarding()

  return (
    <Stack.Navigator
      initialRouteName={
        hasSeenOnboarding ? ModuleSlug.home : ModuleSlug.onboarding
      }
      screenOptions={{
        headerShown: false,
      }}>
      {moduleStacks}
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          ...screenOptions(theme, {
            isBelowStatusBar: Platform.OS === 'android',
          }),
        }}>
        {modalStacks}
      </Stack.Group>
    </Stack.Navigator>
  )
}
