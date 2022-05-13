import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {ContactScreen} from './Screen'
import {contactRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={ContactScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
