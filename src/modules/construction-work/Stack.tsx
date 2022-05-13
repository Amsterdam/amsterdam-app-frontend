import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {ConstructionWorkScreen} from './Screen'
import {constructionWorkRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ConstructionWorkStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={ConstructionWorkScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
