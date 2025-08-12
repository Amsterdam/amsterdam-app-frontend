import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {MijnAmsterdamSettingsScreen} from '@/modules/mijn-amsterdam/screens/MijnAmsterdamSettings.screen'

const Stack = createStackNavigator<RootStackParams>()

export const MijnAmsterdamStack = () => {
  const screenOptions = useScreenOptions({
    screenType: 'settings',
  })

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        component={MijnAmsterdamSettingsScreen}
        name={MijnAmsterdamRouteName.settings}
        options={{headerTitle: 'Mijn Amsterdam'}}
      />
    </Stack.Navigator>
  )
}
