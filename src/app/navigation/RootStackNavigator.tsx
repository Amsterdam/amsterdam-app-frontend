import {CardStyleInterpolators} from '@react-navigation/stack'
import {Platform} from 'react-native'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {useModules} from '@/hooks/useModules'
import {clientModules, coreModules} from '@/modules/modules'
import {ModuleSlug} from '@/modules/slugs'
import {getModuleStack, modals} from '@/modules/stacks'

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
  const {userDisabledModulesBySlug} = useModules()
  const screenOptions = useScreenOptions()

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
          ...screenOptions,
          presentation: 'modal',
        }}>
        {modalStacks}
      </Stack.Group>
    </Stack.Navigator>
  )
}
