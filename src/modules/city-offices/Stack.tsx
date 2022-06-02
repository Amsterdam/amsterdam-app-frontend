import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {CityOfficesRouteName, cityOfficesRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const CityOfficesStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={CityOfficesRouteName.cityOffices}
      screenOptions={screenOptions(theme)}>
      <Stack.Group
        screenOptions={screenOptions(theme, {screenType: 'settings'})}>
        {Object.entries(routes).map(([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
