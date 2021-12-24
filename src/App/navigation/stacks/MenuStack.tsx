import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
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
import {menuScreenOptions, stackScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const MenuStack = () => {
  const {
    addressForm,
    contact,
    menu,
    notification,
    notificationOverview,
    projectDetail,
    projectDetailBody,
    projectManager,
    projectNews,
    projectOverview,
    projectOverviewByDistrict,
    projectWarning,
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
        component={MenuScreen}
        name={menu.name}
        options={menu.options}
      />
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
      <Stack.Screen
        component={ProjectOverviewScreen}
        name={projectOverview.name}
        options={projectOverview.options}
      />
      <Stack.Screen
        component={ProjectOverviewByDistrictScreen}
        name={projectOverviewByDistrict.name}
        options={projectOverviewByDistrict.options}
      />
      <Stack.Screen
        component={ProjectDetailScreen}
        name={projectDetail.name}
        options={projectDetail.options}
      />
      <Stack.Screen
        component={ProjectDetailBodyScreen}
        name={projectDetailBody.name}
        options={projectDetailBody.options}
      />
      <Stack.Screen
        component={ProjectNewsScreen}
        name={projectNews.name}
        options={projectNews.options}
      />
      <Stack.Screen
        component={ProjectWarningScreen}
        name={projectWarning.name}
        options={projectWarning.options}
      />
      <Stack.Screen
        component={ProjectManagerScreen}
        name={projectManager.name}
        options={projectManager.options}
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
