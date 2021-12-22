import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
} from '../../../screens'
import {projectScreenOptions, stackScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const ProjectStack = () => {
  const {
    projectDetail,
    projectDetailBody,
    projectManager,
    projectNews,
    projectOverview,
    projectOverviewByDistrict,
    projectWarning,
  } = projectScreenOptions
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
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
    </Stack.Navigator>
  )
}
