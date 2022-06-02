import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {WasteGuideRouteName, wasteGuideRoutes} from './routes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteMenu}
      screenOptions={screenOptions(theme)}>
      {Object.entries(wasteGuideRoutes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
