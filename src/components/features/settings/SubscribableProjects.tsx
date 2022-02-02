import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {Box} from '../../ui'
import {NoNotificationsMessage} from './NoNotificationsMessage'
import {NoPreviousSubscriptionsMessage} from './NoPreviousSubscriptionsMessage'
import {ProjectSubscriptionsOverview} from './ProjectSubscriptionsOverview'

export const SubscribableProjects = () => {
  const {settings} = useContext(SettingsContext)
  const isNotificationsEnabled = !!settings?.notifications?.projectsEnabled
  const subscribableProjects = settings?.notifications?.projects ?? {}
  const subscribableProjectIds = Object.keys(subscribableProjects)
  const hasSubscribableProjects = subscribableProjectIds.length

  if (!isNotificationsEnabled) {
    return (
      <Box>
        <NoNotificationsMessage />
      </Box>
    )
  }

  if (!hasSubscribableProjects) {
    return <NoPreviousSubscriptionsMessage />
  }

  return (
    <ProjectSubscriptionsOverview
      subscribableProjectIds={subscribableProjectIds}
    />
  )
}
