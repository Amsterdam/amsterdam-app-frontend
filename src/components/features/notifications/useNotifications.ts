import {skipToken} from '@reduxjs/toolkit/query'
import {useSelector} from 'react-redux'
import {useGetNotificationsQuery, useGetProjectsQuery} from '../../../services'
import {RichNotification} from '../../../types'
import {createProjectTitlesDictionary} from '../project'
import {getSubscribedProjects} from '../settings'
import {selectNotificationSettings} from './notificationsSlice'

export const useNotifications = () => {
  const notificationSettings = useSelector(selectNotificationSettings)
  const subscribedProjects = getSubscribedProjects(
    notificationSettings.projects,
  )

  // Retrieve notifications for subscribed projects
  const {
    data: notifications = [],
    isLoading: isNotificationsLoading = undefined,
  } = useGetNotificationsQuery(
    subscribedProjects.length ? {projectIds: subscribedProjects} : skipToken,
  )

  // Retrieve project titles
  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    fields: ['identifier', 'subtitle', 'title'],
  })

  // Create mapping from project ids to titles
  const projectTitlesDictionary = createProjectTitlesDictionary(projects)

  // Add read state and project titles to notifications
  const richNotifications: RichNotification[] = notifications.map(
    notification => ({
      ...notification,
      isRead:
        notificationSettings?.readIds &&
        notificationSettings.readIds.includes(
          notification.news_identifier ?? notification.warning_identifier ?? '',
        ),
      projectTitle: projectTitlesDictionary[notification.project_identifier],
    }),
  )

  return {
    isLoading: isNotificationsLoading || isProjectsLoading,
    richNotifications,
    subscribedProjects,
  }
}
