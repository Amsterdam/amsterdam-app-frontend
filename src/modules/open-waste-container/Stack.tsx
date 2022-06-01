import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {OpenWasteContainerScreen} from './Screen'
import {OpenWasteContainerRouteName, openWasteContainerRoutes} from './routes'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={OpenWasteContainerRouteName.home}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={OpenWasteContainerScreen}
        name={OpenWasteContainerRouteName.home}
        options={openWasteContainerRoutes.Home.options}
      />
    </Stack.Navigator>
  )
}
