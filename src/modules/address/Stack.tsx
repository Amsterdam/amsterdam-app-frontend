import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {AddressRouteName, addressRoutes} from './routes'
import {AddressFormScreen, AddressPrivacyInfoScreen} from './screens'

const Stack = createStackNavigator()

export const AddressStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={AddressRouteName.addressForm}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={AddressFormScreen}
        name={AddressRouteName.addressForm}
        options={addressRoutes.AddressForm.options}
      />
      <Stack.Screen
        component={AddressPrivacyInfoScreen}
        name={AddressRouteName.addressInfo}
        options={addressRoutes.AddressInfo.options}
      />
    </Stack.Navigator>
  )
}
