import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import React from 'react'
import {
  ProjectListByDistance,
  ProjectListByDistrict,
} from '../../components/features/projects'

const Tab = createMaterialTopTabNavigator()

export const ProjectOverviewScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="In de buurt" component={ProjectListByDistance} />
      <Tab.Screen name="Per stadsdeel" component={ProjectListByDistrict} />
    </Tab.Navigator>
  )
}
