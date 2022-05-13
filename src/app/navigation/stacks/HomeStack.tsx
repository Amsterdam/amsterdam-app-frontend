import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {getSharedScreens, HeaderNavigation, stackScreenOptions} from '..'
import {SelectModulesScreen} from '../../../modules/home/screens'
import {HomeScreen} from '../../../screens'
import {ThemeContext} from '../../../themes'
import {routes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={HomeScreen}
        name={routes.home.name}
        options={{...routes.home.options, ...homeScreenOptions}}
      />
      <Stack.Screen
        component={HomeScreen}
        name={routes.modules.name}
        options={routes.modules.options}
      />
      <Stack.Screen
        component={SelectModulesScreen}
        name={routes.selectModules.name}
        options={routes.selectModules.options}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
