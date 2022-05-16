import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {screenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {WasteGuideScreen} from './Screen'
import {wasteGuideRoutes} from './routes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const {theme} = useContext(ThemeContext)
  const {wasteGuide} = wasteGuideRoutes

  return (
    <Stack.Navigator
      initialRouteName={wasteGuide.name}
      screenOptions={{
        ...screenOptions(theme),
      }}>
      <Stack.Screen
        component={WasteGuideScreen}
        name={wasteGuide.name}
        options={wasteGuide.options}
      />
    </Stack.Navigator>
  )
}
