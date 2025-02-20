import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingScreen} from '@/modules/parking/screens/Parking.screen'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        component={ParkingScreen}
        name={ParkingRouteName.parking}
      />
    </Stack.Navigator>
  )
}
