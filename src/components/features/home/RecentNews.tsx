import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {SettingsContext} from '../../../providers'
import {Center} from '../../ui/layout'
import {ArticleOverview} from '../article'
import {getSubscribedProjects} from '../settings'

export const RecentNews = () => {
  const {settings} = useContext(SettingsContext)
  const {notifications} = {...settings}
  const [subscribedProjects, setSubscribedProjects] = useState<
    string[] | undefined
  >()
  const [hasSub, setSub] = useState(false)

  useEffect(() => {
    !!notifications?.projects &&
      setSubscribedProjects(getSubscribedProjects(notifications.projects))
    setSub(true)
  }, [notifications?.projects])

  if (!hasSub) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )
  }
  return (
    <ArticleOverview
      limit={3}
      projectIds={subscribedProjects?.length ? subscribedProjects : undefined}
      title="Actueel"
    />
  )
}
