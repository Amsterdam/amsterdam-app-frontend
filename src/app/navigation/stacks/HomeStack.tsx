import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {HeaderNavigation, stackScreenOptions} from '..'
import {
  BestWishes21Screen,
  HomeScreen,
  NotificationOverviewScreen,
  ProjectOverviewScreen,
  SettingsScreen,
  WasteGuideScreen,
} from '../../../screens'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'
import {homeRoutes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={homeRoutes.home.name}
    screenOptions={{
      ...stackScreenOptions,
      ...homeScreenOptions,
    }}>
    <Stack.Screen
      component={AddressFormScreen}
      name={homeRoutes.addressForm.name}
      options={homeRoutes.addressForm.options}
    />
    <Stack.Screen
      component={BestWishes21Screen}
      name={homeRoutes.bestWishes21.name}
      options={homeRoutes.bestWishes21.options}
    />
    <Stack.Screen
      component={HomeScreen}
      name={homeRoutes.home.name}
      options={homeRoutes.home.options}
    />
    <Stack.Screen
      component={NotificationOverviewScreen}
      name={homeRoutes.notificationOverview.name}
      options={homeRoutes.notificationOverview.options}
    />
    <Stack.Screen
      component={ProjectOverviewScreen}
      name={homeRoutes.projectOverview.name}
      options={homeRoutes.projectOverview.options}
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
  </Stack.Navigator>
)
