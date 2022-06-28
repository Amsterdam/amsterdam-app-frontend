import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  addProjects,
  selectNotificationSettings,
  toggleProjectsEnabled,
} from '@/components/features/notifications'
import {Box, PleaseWait} from '@/components/ui'
import {ScrollView} from '@/components/ui/layout'
import {
  addProjectManagerId,
  addProjectManagerProjects,
  ProjectManagerHeader,
  ProjectManagerProjects,
  useProjectManagerFetcher,
} from '@/modules/construction-work/components/project-manager'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

type Props = {routeParamsId: string}

export const ProjectManagerSummary = ({routeParamsId}: Props) => {
  const notificationSettings = useSelector(selectNotificationSettings)
  const dispatch = useDispatch()
  const {
    authorizedProjects,
    isLoadingProjects,
    isGetProjectsSuccess,
    isGetProjectManagerError,
    isGetProjectManagerLoading,
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
    routeParamsId && dispatch(addProjectManagerId(routeParamsId))
  }, [dispatch, routeParamsId])

  const storeProjectManagerSettings = useCallback(() => {
    if (projectManager) {
      dispatch(addProjectManagerProjects(projectManager.projects))

      if (!notificationSettings.projectsEnabled) {
        dispatch(toggleProjectsEnabled())
      }
      dispatch(addProjects(projectManager.projects))
    }
  }, [projectManager]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeProjectManagerSettings()
  }, [storeProjectManagerSettings])

  if (
    (isGetProjectManagerLoading || isLoadingProjects) &&
    !isGetProjectManagerError
  ) {
    return <PleaseWait />
  }

  return (
    <ScrollView>
      <Box insetVertical="lg" insetHorizontal="md">
        <ProjectManagerHeader
          hasProjects={
            !isGetProjectManagerError &&
            isGetProjectsSuccess &&
            !!authorizedProjects?.length
          }
        />
        <ProjectManagerProjects projects={authorizedProjects} />
      </Box>
    </ScrollView>
  )
}
