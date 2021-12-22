import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {
  ContactScreen,
  MenuScreen,
  NotificationOverviewScreen,
  SettingsScreen,
  WasteMenuScreen,
  WasteScreen,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from '../../../screens'
import {CreateNotificationScreen} from '../../../screens/create-notification'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'
import {menuScreenOptions, stackScreenOptions} from '../screenOptions'
import {ProjectStack} from '.'

const Stack = createStackNavigator()

export const MenuStack = () => {
  const {
    addressForm,
    contact,
    menu,
    notification,
    notificationOverview,
    projectStack,
    settings,
    wasteGuide,
    wasteMenu,
    webView,
    whereToPutBulkyWaste,
  } = menuScreenOptions
  return (
    <Stack.Navigator
      initialRouteName={menu.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={AddressFormScreen}
        name={addressForm.name}
        options={addressForm.options}
      />
      <Stack.Screen
        component={ContactScreen}
        name={contact.name}
        options={contact.options}
      />
      <Stack.Screen
        component={CreateNotificationScreen}
        name={notification.name}
        options={notification.options}
      />
      <Stack.Screen component={MenuScreen} name="Menu" options={menu.options} />
      <Stack.Screen
        component={ProjectStack}
        name={projectStack.name}
        options={projectStack.options}
      />
      <Stack.Screen
        component={NotificationOverviewScreen}
        name={notificationOverview.name}
        options={notificationOverview.options}
      />
      <Stack.Screen
        component={SettingsScreen}
        name={settings.name}
        options={settings.options}
      />
      <Stack.Screen
        component={WasteScreen}
        name={wasteGuide.name}
        options={wasteGuide.options}
      />
      <Stack.Screen
        component={WasteMenuScreen}
        name={wasteMenu.name}
        options={wasteMenu.options}
      />
      <Stack.Screen
        component={WebViewScreen}
        name={webView.name}
        options={webView.options}
      />
      <Stack.Screen
        component={WhereToPutBulkyWasteScreen}
        name={whereToPutBulkyWaste.name}
        options={whereToPutBulkyWaste.options}
      />
    </Stack.Navigator>
  )
}
