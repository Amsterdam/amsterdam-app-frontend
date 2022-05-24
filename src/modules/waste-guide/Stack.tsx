import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {wasteGuideRoutes} from './routes'
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
  const {
    bulkyWasteAppointment,
    recyclingGuide,
    reportNotCollected,
    wasteGuide,
    wasteGuideCollectionPoints,
    wasteGuideContainers,
    wasteGuideFeedback,
    wasteMenu,
    whereToPutBulkyWaste,
  } = wasteGuideRoutes

  return (
    <Stack.Navigator
      initialRouteName={wasteMenu.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={BulkyWasteAppointmentScreen}
        name={bulkyWasteAppointment.name}
        options={bulkyWasteAppointment.options}
      />
      <Stack.Screen
        component={RecyclingGuideScreen}
        name={recyclingGuide.name}
        options={recyclingGuide.options}
      />
      <Stack.Screen
        component={ReportNotCollectedScreen}
        name={reportNotCollected.name}
        options={reportNotCollected.options}
      />
      <Stack.Screen
        component={WasteGuideScreen}
        name={wasteGuide.name}
        options={{
          ...screenOptions(theme, {screenType: 'settings'}),
          ...wasteGuide.options,
        }}
      />
      <Stack.Screen
        component={WasteGuideCollectionPointsScreen}
        name={wasteGuideCollectionPoints.name}
        options={wasteGuideCollectionPoints.options}
      />
      <Stack.Screen
        component={WasteGuideContainersScreen}
        name={wasteGuideContainers.name}
        options={wasteGuideContainers.options}
      />
      <Stack.Screen
        component={WasteGuideFeedbackScreen}
        name={wasteGuideFeedback.name}
        options={wasteGuideFeedback.options}
      />
      <Stack.Screen
        component={WasteMenuScreen}
        name={wasteMenu.name}
        options={wasteMenu.options}
      />
      <Stack.Screen
        component={WhereToPutBulkyWasteScreen}
        name={whereToPutBulkyWaste.name}
        options={whereToPutBulkyWaste.options}
      />
    </Stack.Navigator>
  )
}
