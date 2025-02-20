import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingHomeScreen} from '@/modules/parking/screens/ParkingHome.screen'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ParkingRouteName.parkingHome}
      screenOptions={screenOptions}>
      <Stack.Screen
        component={ParkingHomeScreen}
        name={ParkingRouteName.parkingHome}
      />
    </Stack.Navigator>
  )
}
