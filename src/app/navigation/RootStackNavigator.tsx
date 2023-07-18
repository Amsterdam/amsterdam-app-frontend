import {CardStyleInterpolators} from '@react-navigation/stack'
import {Platform} from 'react-native'
import {RootStackParams, screenOptions} from '@/app/navigation'
import {useModules} from '@/hooks'
import {clientModules, coreModules} from '@/modules/modules'
import {ModuleSlug} from '@/modules/slugs'
import {getModuleStack, modals} from '@/modules/stacks'
import {useTheme} from '@/themes'
import {createStackNavigator} from '@/utils/navigation/createStackNavigator'

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
  const {userDisabledModulesBySlug} = useModules()

  return (
    <Stack.Navigator
      initialRouteName={
        userDisabledModulesBySlug.includes(ModuleSlug.welcome)
          ? ModuleSlug.home
          : ModuleSlug.welcome
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
