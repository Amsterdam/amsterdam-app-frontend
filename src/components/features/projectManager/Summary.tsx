import React, {useCallback, useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SettingsContext} from '../../../providers'
import {useGetProjectManagerQuery, useGetProjectsQuery} from '../../../services'
import {setCredentials} from '../../../store'
import {encryptWithAES} from '../../../utils'
import {Box, PleaseWait} from '../../ui'
import {ScrollView} from '../../ui/layout'
import {ProjectManagerHeader} from './Header'
import {ProjectManagerProjects} from './Projects'
import {addProjectManager, selectProjectManager} from './projectManagerSlice'

type Props = {routeParamsId: string}

export const ProjectManagerSummary = ({routeParamsId}: Props) => {
  const dispatch = useDispatch()
  const {id: projectManagerId} = useSelector(selectProjectManager)
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

  const {data: projectManager} = useGetProjectManagerQuery(
    {id: projectManagerId},
    {skip: !projectManagerId},
  )

  const {
    isSuccess: isGetProjectsSuccess,
    isLoading: isLoadingProjects,
    authorizedProjects,
  } = useGetProjectsQuery(
    {
      fields: ['identifier', 'subtitle', 'title'],
    },
    {
      selectFromResult: ({data, isSuccess, isLoading}) => ({
        authorizedProjects: data?.filter(project =>
          projectManager?.projects.includes(project.identifier),
        ),
        isSuccess,
        isLoading,
      }),
      skip: !projectManager,
    },
  )

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
