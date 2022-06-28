import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {AddressRouteName} from './routes'
import {addressScreenConfig as routes} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const AddressStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={AddressRouteName.addressForm}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
