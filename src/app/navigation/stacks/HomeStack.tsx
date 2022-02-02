import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {getSharedScreens, HeaderNavigation, stackScreenOptions} from '..'
import {HomeScreen} from '../../../screens'
import {tabBarDisplayHelper} from '../../../utils/tabBarDisplayHelper'
import {routes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = ({navigation, route}) => {
  useEffect(() => {
    // hides tab bar on modal screens
    tabBarDisplayHelper(navigation, route)
  }, [navigation, route])
  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={{
        ...stackScreenOptions,
      }}>
      <Stack.Screen
        component={HomeScreen}
        name={routes.home.name}
        options={{...routes.home.options, ...homeScreenOptions}}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
