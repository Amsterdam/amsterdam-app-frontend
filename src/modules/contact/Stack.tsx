import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {ContactScreen} from './Screen'
import {contactRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={ContactScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
