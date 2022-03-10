import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import React, {useContext} from 'react'
import {NearestProjects, Projects} from '../../components/features/projects'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'

const Tab = createMaterialTopTabNavigator()

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarStyle: {
    borderBottomColor: 'red',
  },
  tabBarItemStyle: {
    borderBottomColor: 'red',
  },
  tabBarLabelStyle: {
    fontFamily: font.weight.demi,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    textTransform: 'none',
  },
  tabBarActiveTintColor: color.font.regular,
  tabBarInactiveTintColor: color.font.secondary,
  tabBarIndicatorStyle: {
    backgroundColor: color.touchable.secondary,
    height: 3,
  },
}

const tabLabels = {nearestProjects: 'In de buurt', projects: 'Per stadsdeel'}

export const ProjectsScreen = () => {
  const device = useContext(DeviceContext)

  return (
    <Tab.Navigator
      initialLayout={{width: device.width}}
      screenOptions={screenOptions}>
      <Tab.Screen
        component={NearestProjects}
        name={tabLabels.nearestProjects}
        options={{tabBarAccessibilityLabel: tabLabels.nearestProjects}}
      />
      <Tab.Screen
        component={Projects}
        name={tabLabels.projects}
        options={{tabBarAccessibilityLabel: tabLabels.projects}}
      />
    </Tab.Navigator>
  )
}
