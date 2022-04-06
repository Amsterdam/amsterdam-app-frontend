import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setCredentials} from '../../../store'
import {encryptWithAES} from '../../../utils'
import {Box, PleaseWait} from '../../ui'
import {ScrollView} from '../../ui/layout'
import {
  addProjects,
  selectNotificationSettings,
  toggleProjectsEnabled,
} from '../notifications'
import {
  addProjectManager,
  ProjectManagerHeader,
  ProjectManagerProjects,
  useProjectManagerFetcher,
} from '.'

type Props = {routeParamsId: string}

export const ProjectManagerSummary = ({routeParamsId}: Props) => {
  const notificationSettings = useSelector(selectNotificationSettings)
  const dispatch = useDispatch()
  const {
    authorizedProjects,
    isLoadingProjects,
    isGetProjectsSuccess,
    projectManager,
    projectManagerId,
  } = useProjectManagerFetcher()

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

      if (!notificationSettings.projectsEnabled) {
        dispatch(toggleProjectsEnabled())
      }
      dispatch(addProjects(projectManager.projects))
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
