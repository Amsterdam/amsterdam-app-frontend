import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {getSharedScreens, stackScreenOptions} from '../'
import {AdminScreen, ContactScreen, MenuScreen} from '../../../screens'
import {tabBarDisplayHelper} from '../../../utils/tabBarDisplayHelper'
import {routes} from '../routes'

const Stack = createStackNavigator()

export const MenuStack = ({navigation, route}) => {
  useEffect(() => {
    // hides tab bar on modal screens
    tabBarDisplayHelper(navigation, route)
  }, [navigation, route])
  return (
    <Stack.Navigator
      initialRouteName={routes.menu.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={AdminScreen}
        name={routes.admin.name}
        options={routes.admin.options}
      />
      <Stack.Screen
        component={ContactScreen}
        name={routes.contact.name}
        options={routes.contact.options}
      />
      <Stack.Screen
        component={MenuScreen}
        name={routes.menu.name}
        options={routes.menu.options}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
