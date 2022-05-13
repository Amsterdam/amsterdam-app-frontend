import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {OpenWasteContainerScreen} from './Screen'
import {openWasteContainerRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={OpenWasteContainerScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
