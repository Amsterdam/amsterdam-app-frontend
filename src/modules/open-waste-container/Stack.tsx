import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {OpenWasteContainerScreen} from './Screen'
import {openWasteContainerRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={OpenWasteContainerScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
