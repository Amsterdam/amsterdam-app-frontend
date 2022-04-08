import React from 'react'
import {useSelector} from 'react-redux'
import {ArticleOverview} from '../article'
import {selectNotificationSettings} from '../notifications'

export const RecentNews = () => {
  const notificationSettings = useSelector(selectNotificationSettings)

  const subscribedProjects = Object.keys(notificationSettings.projects).filter(
    project => notificationSettings.projects[project],
  )

  return (
    <ArticleOverview
      limit={3}
      projectIds={subscribedProjects.length ? subscribedProjects : undefined}
      title="Actueel"
    />
  )
}
