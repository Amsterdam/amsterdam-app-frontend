import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {CityOfficesRouteName} from './routes'
import {cityOfficesScreenConfig as routes} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const CityOfficesStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={CityOfficesRouteName.cityOffices}
      screenOptions={screenOptions(theme)}>
      <Stack.Group>
        {Object.entries(routes).map(([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
