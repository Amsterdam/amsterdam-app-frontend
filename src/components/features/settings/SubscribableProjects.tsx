import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {Box} from '../../ui'
import {NoNotificationsMessage} from './NoNotificationsMessage'
import {NoPreviousSubscriptionsMessage} from './NoPreviousSubscriptionsMessage'
import {ProjectSubscriptionsOverview} from './ProjectSubscriptionsOverview'

export const SubscribableProjects = () => {
  const {settings} = useContext(SettingsContext)
  const notificationsEnabled = settings?.notifications?.projectsEnabled
  const subscribableProjects = settings?.notifications?.projects ?? {}
  const subscribableProjectIds = Object.keys(subscribableProjects)
  const hasSubscribableProjects = subscribableProjectIds.length

  return (
    <>
      <Box>
        {!notificationsEnabled && <NoNotificationsMessage />}
        {notificationsEnabled && !hasSubscribableProjects ? (
          <NoPreviousSubscriptionsMessage />
        ) : null}
      </Box>
      {notificationsEnabled && hasSubscribableProjects ? (
        <ProjectSubscriptionsOverview
          subscribableProjectIds={subscribableProjectIds}
        />
      ) : null}
    </>
  )
}
