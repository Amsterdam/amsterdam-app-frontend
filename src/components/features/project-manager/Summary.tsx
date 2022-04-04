import React, {useCallback, useContext, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {SettingsContext} from '../../../providers'
import {setCredentials} from '../../../store'
import {encryptWithAES} from '../../../utils'
import {Box, PleaseWait} from '../../ui'
import {ScrollView} from '../../ui/layout'
import {
  addProjectManager,
  ProjectManagerHeader,
  ProjectManagerProjects,
  useProjectManagerFetcher,
} from '.'

type Props = {routeParamsId: string}

export const ProjectManagerSummary = ({routeParamsId}: Props) => {
  const dispatch = useDispatch()
  const {
    authorizedProjects,
    isLoadingProjects,
    isGetProjectsSuccess,
    projectManager,
    projectManagerId,
  } = useProjectManagerFetcher()
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications

  dispatch(
    setCredentials({
      managerToken: encryptWithAES({
        password: process.env.AUTH_PASSWORD ?? '',
        salt: projectManagerId,
      }),
    }),
  )

  useEffect(() => {
    routeParamsId && dispatch(addProjectManager({id: routeParamsId}))
  }, [dispatch, routeParamsId])

  const storeProjectManagerSettings = useCallback(async () => {
    if (projectManager) {
      const newProjectManagerSettings = {
        id: projectManagerId,
        projects: projectManager.projects,
      }
      dispatch(addProjectManager(newProjectManagerSettings))

      const projectManagerAuthorizedProjects = projectManager.projects.reduce(
        (acc, projectId) => Object.assign(acc, {[projectId]: true}),
        {},
      )

      changeSettings('notifications', {
        ...notificationSettings,
        projectsEnabled: true,
        projects: {
          ...(notificationSettings && {...notificationSettings.projects}),
          ...projectManagerAuthorizedProjects,
        },
      })
    }
  }, [projectManager]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeProjectManagerSettings()
  }, [storeProjectManagerSettings])

  if (isLoadingProjects) {
    return <PleaseWait />
  }

  return (
    <ScrollView>
      <Box insetVertical="lg" insetHorizontal="md">
        <ProjectManagerHeader
          hasProjects={isGetProjectsSuccess && !!authorizedProjects?.length}
        />
        <ProjectManagerProjects projects={authorizedProjects} />
      </Box>
    </ScrollView>
  )
}
