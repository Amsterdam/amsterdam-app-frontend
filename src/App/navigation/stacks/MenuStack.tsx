import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {menuRoutes, stackScreenOptions} from '../'
import {
  ContactScreen,
  MenuScreen,
  NotificationOverviewScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
  SettingsScreen,
  WasteMenuScreen,
  WasteScreen,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from '../../../screens'
import {CreateNotificationScreen} from '../../../screens/create-notification'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'

const Stack = createStackNavigator()

export const MenuStack = () => (
  <Stack.Navigator
    initialRouteName={menuRoutes.menu.name}
    screenOptions={stackScreenOptions}>
    <Stack.Screen
      component={MenuScreen}
      name={menuRoutes.menu.name}
      options={menuRoutes.menu.options}
    />
    <Stack.Screen
      component={AddressFormScreen}
      name={menuRoutes.addressForm.name}
      options={menuRoutes.addressForm.options}
    />
    <Stack.Screen
      component={ContactScreen}
      name={menuRoutes.contact.name}
      options={menuRoutes.contact.options}
    />
    <Stack.Screen
      component={CreateNotificationScreen}
      name={menuRoutes.notification.name}
      options={menuRoutes.notification.options}
    />
    <Stack.Screen
      component={ProjectOverviewScreen}
      name={menuRoutes.projectOverview.name}
      options={menuRoutes.projectOverview.options}
    />
    <Stack.Screen
      component={ProjectOverviewByDistrictScreen}
      name={menuRoutes.projectOverviewByDistrict.name}
      options={menuRoutes.projectOverviewByDistrict.options}
    />
    <Stack.Screen
      component={ProjectDetailScreen}
      name={menuRoutes.projectDetail.name}
      options={menuRoutes.projectDetail.options}
    />
    <Stack.Screen
      component={ProjectDetailBodyScreen}
      name={menuRoutes.projectDetailBody.name}
      options={menuRoutes.projectDetailBody.options}
    />
    <Stack.Screen
      component={ProjectNewsScreen}
      name={menuRoutes.projectNews.name}
      options={menuRoutes.projectNews.options}
    />
    <Stack.Screen
      component={ProjectWarningScreen}
      name={menuRoutes.projectWarning.name}
      options={menuRoutes.projectWarning.options}
    />
    <Stack.Screen
      component={ProjectManagerScreen}
      name={menuRoutes.projectManager.name}
      options={menuRoutes.projectManager.options}
    />
    <Stack.Screen
      component={NotificationOverviewScreen}
      name={menuRoutes.notificationOverview.name}
      options={menuRoutes.notificationOverview.options}
    />
    <Stack.Screen
      component={SettingsScreen}
      name={menuRoutes.settings.name}
      options={menuRoutes.settings.options}
    />
    <Stack.Screen
      component={WasteScreen}
      name={menuRoutes.waste.name}
      options={menuRoutes.waste.options}
    />
    <Stack.Screen
      component={WasteMenuScreen}
      name={menuRoutes.wasteMenu.name}
      options={menuRoutes.wasteMenu.options}
    />
    <Stack.Screen
      component={WebViewScreen}
      name={menuRoutes.webView.name}
      options={menuRoutes.webView.options}
    />
    <Stack.Screen
      component={WhereToPutBulkyWasteScreen}
      name={menuRoutes.whereToPutBulkyWaste.name}
      options={menuRoutes.whereToPutBulkyWaste.options}
    />
  </Stack.Navigator>
)
