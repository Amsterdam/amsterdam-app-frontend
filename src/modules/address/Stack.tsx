import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {screenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {addressRoutes as routes} from './routes'
import {AddressFormScreen, AddressPrivacyInfoScreen} from './screens'

const Stack = createStackNavigator()

export const AddressStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.addressForm.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={AddressFormScreen}
        name={routes.addressForm.name}
        options={routes.addressForm.options}
      />
      <Stack.Screen
        component={AddressPrivacyInfoScreen}
        name={routes.addressInfo.name}
        options={routes.addressInfo.options}
      />
    </Stack.Navigator>
  )
}
