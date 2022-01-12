import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {
  NotificationOverviewScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
  SettingsScreen,
  WasteGuideScreen,
  WasteMenuScreen,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from '../../../screens'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'
import {homeRoutes, menuRoutes} from '../routes'

export const getSharedScreens = (
  Stack: ReturnType<typeof createStackNavigator>,
) => (
  <>
    <Stack.Screen
      component={AddressFormScreen}
      name={homeRoutes.addressForm.name}
      options={homeRoutes.addressForm.options}
    />
    <Stack.Screen
      component={NotificationOverviewScreen}
      name={homeRoutes.notificationOverview.name}
      options={homeRoutes.notificationOverview.options}
    />
    <Stack.Screen
      component={ProjectDetailBodyScreen}
      name={menuRoutes.projectDetailBody.name}
      options={menuRoutes.projectDetailBody.options}
    />
    <Stack.Screen
      component={ProjectDetailScreen}
      name={menuRoutes.projectDetail.name}
      options={menuRoutes.projectDetail.options}
    />
    <Stack.Screen
      component={ProjectManagerScreen}
      name={menuRoutes.projectManager.name}
      options={menuRoutes.projectManager.options}
    />
    <Stack.Screen
      component={ProjectNewsScreen}
      name={menuRoutes.projectNews.name}
      options={menuRoutes.projectNews.options}
    />
    <Stack.Screen
      component={ProjectOverviewScreen}
      name={homeRoutes.projectOverview.name}
      options={homeRoutes.projectOverview.options}
    />
    <Stack.Screen
      component={ProjectWarningScreen}
      name={menuRoutes.projectWarning.name}
      options={menuRoutes.projectWarning.options}
    />
    <Stack.Screen
      component={SettingsScreen}
      name={homeRoutes.settings.name}
      options={homeRoutes.settings.options}
    />
    <Stack.Screen
      component={WasteGuideScreen}
      name={homeRoutes.wasteGuide.name}
      options={homeRoutes.wasteGuide.options}
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
  </>
)
