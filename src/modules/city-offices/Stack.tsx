import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {cityOfficesRoutes as routes} from './routes'
import {
  CityOfficesScreen,
  ContactScreen,
  MakeAppointmentScreen,
} from './screens'

const Stack = createStackNavigator()

export const CityOfficesStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={routes.cityOffices.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={CityOfficesScreen}
        name={routes.cityOffices.name}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.cityOffices.options,
        }}
      />
      <Stack.Screen
        component={ContactScreen}
        name={routes.contact.name}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.contact.options,
        }}
      />
      <Stack.Screen
        component={MakeAppointmentScreen}
        name={routes.makeAppointment.name}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.makeAppointment.options,
        }}
      />
    </Stack.Navigator>
  )
}
