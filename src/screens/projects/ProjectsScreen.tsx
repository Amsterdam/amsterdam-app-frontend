import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import React, {useContext} from 'react'
import {
  ProjectListByDistance,
  ProjectListByDistrict,
} from '../../components/features/projects'
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

export const ProjectsScreen = () => {
  const device = useContext(DeviceContext)

  return (
    <Tab.Navigator
      initialLayout={{width: device.width}}
      screenOptions={screenOptions}>
      <Tab.Screen name="In de buurt" component={ProjectListByDistance} />
      <Tab.Screen name="Per stadsdeel" component={ProjectListByDistrict} />
    </Tab.Navigator>
  )
}
