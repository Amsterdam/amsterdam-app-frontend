import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {AddressRouteName} from '@/modules/address/routes'
import {screenConfig} from '@/modules/address/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const AddressStack = () => {
  const screenOptions = useScreenOptions({
    screenType: 'settings',
  })

  const altScreenOptions = useScreenOptions({
    screenType: 'default',
  })

  return (
    <Stack.Navigator
      initialRouteName={AddressRouteName.address}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={{
            ...(route.screenType === 'default'
              ? altScreenOptions
              : screenOptions),
            ...route.options,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
