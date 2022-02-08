import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {
  NotificationOverviewScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
  SettingsScreen,
  WasteGuideScreen,
  WasteMenuScreen,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from '../../../screens'
import {CreateNotificationScreen} from '../../../screens/create-notification'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'
import {routes} from '../routes'

export const getSharedScreens = (
  Stack: ReturnType<typeof createStackNavigator>,
) => (
  <>
    <Stack.Screen
      component={AddressFormScreen}
      name={routes.addressForm.name}
      options={routes.addressForm.options}
    />
    <Stack.Screen
      component={CreateNotificationScreen}
      name={routes.notification.name}
      options={routes.notification.options}
    />
    <Stack.Screen
      component={NotificationOverviewScreen}
      name={routes.notificationOverview.name}
      options={routes.notificationOverview.options}
    />
    <Stack.Screen
      component={ProjectDetailBodyScreen}
      name={routes.projectDetailBody.name}
      options={routes.projectDetailBody.options}
    />
    <Stack.Screen
      component={ProjectDetailScreen}
      name={routes.projectDetail.name}
      options={routes.projectDetail.options}
    />
    <Stack.Screen
      component={ProjectManagerScreen}
      name={routes.projectManager.name}
      options={routes.projectManager.options}
    />
    <Stack.Screen
      component={ProjectNewsScreen}
      name={routes.projectNews.name}
      options={routes.projectNews.options}
    />
    <Stack.Screen
      component={ProjectOverviewScreen}
      name={routes.projectOverview.name}
      options={routes.projectOverview.options}
    />
    <Stack.Screen
      component={ProjectOverviewByDistrictScreen}
      name={routes.projectOverviewByDistrict.name}
      options={routes.projectOverviewByDistrict.options}
    />
    <Stack.Screen
      component={ProjectWarningScreen}
      name={routes.projectWarning.name}
      options={routes.projectWarning.options}
    />
    <Stack.Screen
      component={SettingsScreen}
      name={routes.settings.name}
      options={routes.settings.options}
    />
    <Stack.Screen
      component={WasteGuideScreen}
      name={routes.wasteGuide.name}
      options={routes.wasteGuide.options}
    />
    <Stack.Screen
      component={WasteMenuScreen}
      name={routes.wasteMenu.name}
      options={routes.wasteMenu.options}
    />
    <Stack.Screen
      component={WebViewScreen}
      name={routes.webView.name}
      options={routes.webView.options}
    />
    <Stack.Screen
      component={WhereToPutBulkyWasteScreen}
      name={routes.whereToPutBulkyWaste.name}
      options={routes.whereToPutBulkyWaste.options}
    />
  </>
)