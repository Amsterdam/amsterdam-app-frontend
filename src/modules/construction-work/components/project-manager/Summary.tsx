import React, {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Box, PleaseWait} from '@/components/ui'
import {ScrollView} from '@/components/ui/layout'
import {useProjectManager} from '@/modules/construction-work-editor/hooks'
import {
  addProjectManagerId,
  addProjectManagerProjects,
} from '@/modules/construction-work-editor/slice'
import {
  ProjectManagerHeader,
  ProjectManagerProjects,
} from '@/modules/construction-work/components/project-manager'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

type Props = {routeParamsId: string}

export const ProjectManagerSummary = ({routeParamsId}: Props) => {
  const dispatch = useDispatch()
  const {
    authorizedProjects,
    isLoadingProjects,
    isGetProjectsSuccess,
    isGetProjectManagerError,
    isGetProjectManagerLoading,
    projectManager,
    projectManagerId,
  } = useProjectManager()

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
    }
    // TODO: also follow these projects (/projects/follow)
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
