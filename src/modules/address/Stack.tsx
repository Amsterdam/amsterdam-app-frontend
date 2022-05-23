import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {addressRoutes as routes} from './routes'
import {AddressFormScreen, AddressPrivacyInfoScreen} from './screens'

const Stack = createStackNavigator()

export const AddressStack = () => {
  const {theme} = useSelector(selectTheme)

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
