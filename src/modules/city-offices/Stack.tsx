import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {screenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {cityOfficesRoutes as routes} from './routes'
import {CityOfficesScreen} from './screens'

const Stack = createStackNavigator()

export const CityOfficesStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.cityOffices.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={CityOfficesScreen}
        name={routes.cityOffices.name}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.cityOffices.options,
        }}
      />
    </Stack.Navigator>
  )
}
