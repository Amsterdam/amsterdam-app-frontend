import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {ContactScreen} from './Screen'
import {ContactRouteName, contactRoutes} from './routes'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={ContactRouteName.home}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={ContactScreen}
        name={ContactRouteName.home}
        options={contactRoutes.Home.options}
      />
    </Stack.Navigator>
  )
}
