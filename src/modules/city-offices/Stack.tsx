import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '../../app/navigation'
import {CityOfficesRouteName, cityOfficesRoutes as routes} from './routes'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const CityOfficesStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={CityOfficesRouteName.cityOffices}
      screenOptions={screenOptions(theme)}>
      <Stack.Group
        screenOptions={screenOptions(theme, {screenType: 'settings'})}>
        {Object.entries(routes).map(([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
