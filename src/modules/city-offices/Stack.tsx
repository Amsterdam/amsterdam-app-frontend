import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {CityOfficesRouteName, cityOfficesRoutes as routes} from './routes'
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
      initialRouteName={CityOfficesRouteName.home}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={CityOfficesScreen}
        name={CityOfficesRouteName.home}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.Home.options,
        }}
      />
      <Stack.Screen
        component={ContactScreen}
        name={CityOfficesRouteName.contact}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.Contact.options,
        }}
      />
      <Stack.Screen
        component={MakeAppointmentScreen}
        name={CityOfficesRouteName.makeAppointment}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...routes.MakeAppointment.options,
        }}
      />
    </Stack.Navigator>
  )
}
