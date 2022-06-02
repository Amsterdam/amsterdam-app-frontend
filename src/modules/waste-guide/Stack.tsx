import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {WasteGuideRouteName, wasteGuideRoutes} from './routes'
import {
  BulkyWasteAppointmentScreen,
  RecyclingGuideScreen,
  ReportNotCollectedScreen,
  WasteGuideCollectionPointsScreen,
  WasteGuideContainersScreen,
  WasteGuideFeedbackScreen,
  WasteGuideScreen,
  WasteMenuScreen,
  WhereToPutBulkyWasteScreen,
} from './screens'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteMenu}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={BulkyWasteAppointmentScreen}
        name={WasteGuideRouteName.bulkyWasteAppointment}
        options={wasteGuideRoutes.BulkyWasteAppointment.options}
      />
      <Stack.Screen
        component={RecyclingGuideScreen}
        name={WasteGuideRouteName.recyclingGuide}
        options={wasteGuideRoutes.RecyclingGuide.options}
      />
      <Stack.Screen
        component={ReportNotCollectedScreen}
        name={WasteGuideRouteName.reportNotCollected}
        options={wasteGuideRoutes.ReportNotCollected.options}
      />
      <Stack.Screen
        component={WasteGuideScreen}
        name={WasteGuideRouteName.home}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...wasteGuideRoutes.Home.options,
        }}
      />
      <Stack.Screen
        component={WasteGuideCollectionPointsScreen}
        name={WasteGuideRouteName.wasteGuideCollectionPoints}
        options={wasteGuideRoutes.WasteGuideCollectionPoints.options}
      />
      <Stack.Screen
        component={WasteGuideContainersScreen}
        name={WasteGuideRouteName.wasteGuideContainers}
        options={wasteGuideRoutes.WasteGuideContainers.options}
      />
      <Stack.Screen
        component={WasteGuideFeedbackScreen}
        name={WasteGuideRouteName.wasteGuideFeedback}
        options={wasteGuideRoutes.WasteGuideFeedback.options}
      />
      <Stack.Screen
        component={WasteMenuScreen}
        name={WasteGuideRouteName.wasteMenu}
        options={wasteGuideRoutes.WasteMenu.options}
      />
      <Stack.Screen
        component={WhereToPutBulkyWasteScreen}
        name={WasteGuideRouteName.whereToPutBulkyWaste}
        options={wasteGuideRoutes.WhereToPutBulkyWaste.options}
      />
    </Stack.Navigator>
  )
}
