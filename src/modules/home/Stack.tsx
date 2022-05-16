import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {screenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {homeRoutes as routes} from './routes'
import {HomeScreen} from './screens'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={HomeScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
