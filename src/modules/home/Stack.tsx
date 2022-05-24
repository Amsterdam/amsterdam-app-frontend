import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {homeRoutes as routes} from './routes'
import {HomeScreen} from './screens'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {theme} = useSelector(selectTheme)

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
