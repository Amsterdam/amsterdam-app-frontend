import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {NotificationOverviewScreen, WebViewScreen} from '../../../screens'
import {
  CreateNotificationScreen,
  WritingGuideScreen,
} from '../../../screens/create-notification'
import {
  AuthorizedProjectsScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from '../../../screens/projects'
import {routes} from '../routes'

export const getSharedScreens = (
  Stack: ReturnType<typeof createStackNavigator>,
) => (
  <>
    <Stack.Screen
      component={AuthorizedProjectsScreen}
      name={routes.authorizedProjects.name}
      options={routes.authorizedProjects.options}
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
      component={ProjectsScreen}
      name={routes.projects.name}
      options={routes.projects.options}
    />
    <Stack.Screen
      component={ProjectWarningScreen}
      name={routes.projectWarning.name}
      options={routes.projectWarning.options}
    />
    <Stack.Screen
      component={WebViewScreen}
      name={routes.webView.name}
      options={routes.webView.options}
    />
    <Stack.Screen
      component={WritingGuideScreen}
      name={routes.writingGuide.name}
      options={routes.writingGuide.options}
    />
  </>
)
