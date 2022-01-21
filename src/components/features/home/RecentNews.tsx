import React, {useContext, useEffect, useState} from 'react'
import {SettingsContext} from '../../../providers'
import {PleaseWait} from '../../ui'
import {ArticleOverview} from '../article'
import {getSubscribedProjects} from '../settings'

export const RecentNews = () => {
  const {settings} = useContext(SettingsContext)
  const {notifications} = {...settings}
  const [subscribedProjects, setSubscribedProjects] = useState<
    string[] | undefined
  >()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setSubscribedProjects(getSubscribedProjects(notifications?.projects))
    setLoading(false)
  }, [notifications?.projects])
  return (
    <>
      {isLoading ? (
        <PleaseWait />
      ) : subscribedProjects?.length ? (
        <ArticleOverview
          limit={3}
          projectIds={subscribedProjects}
          title="Actueel"
        />
      ) : (
        <ArticleOverview limit={3} title="Actueel" />
      )}
    </>
  )
}
