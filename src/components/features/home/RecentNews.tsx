import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {SettingsContext} from '../../../providers'
import {Center} from '../../ui/layout'
import {ArticleOverview} from '../article'
import {getSubscribedProjects} from '../settings'

export const RecentNews = () => {
  const {isLoading, settings} = useContext(SettingsContext)
  const {notifications} = {...settings}
  const [subscribedProjects, setSubscribedProjects] = useState<
    string[] | undefined
  >()

  useEffect(() => {
    setSubscribedProjects(getSubscribedProjects(notifications?.projects))
  }, [notifications?.projects])

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )
  }
  return subscribedProjects?.length ? (
    <ArticleOverview
      limit={3}
      projectIds={subscribedProjects}
      title="Actueel"
    />
  ) : (
    <ArticleOverview limit={3} title="Actueel" />
  )
}
