import {createSelector} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ProjectsItem} from '../../../../types'
import {
  useGetProjectManagerQuery,
  useGetProjectsQuery,
} from '../../construction-work.service'
import {selectProjectManager} from './projectManagerSlice'

export const useProjectManagerFetcher = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const {
    data: projectManager,
    isError: isGetProjectManagerError,
    isLoading: isGetProjectManagerLoading,
  } = useGetProjectManagerQuery(
    {id: projectManagerId},
    {skip: !projectManagerId, refetchOnMountOrArgChange: true},
  )

  // avoid unnecessary re-renders
  const selectAuthProjects = useMemo(() => {
    return createSelector(
      (result: {data?: ProjectsItem[]}) => result.data,
      data =>
        data?.filter(
          project =>
            projectManager?.projects.includes(project.identifier) ?? [],
        ),
    )
  }, [projectManager?.projects])

  const {
    isError: isGetProjectsError,
    isSuccess: isGetProjectsSuccess,
    isLoading: isLoadingProjects,
    authorizedProjects,
  } = useGetProjectsQuery(
    {
      fields: ['identifier', 'subtitle', 'title'],
    },
    {
      selectFromResult: result => ({
        ...result,
        authorizedProjects: selectAuthProjects(result),
      }),
      skip: !projectManager,
    },
  )

  return {
    authorizedProjects,
    isGetProjectsError,
    isGetProjectsSuccess,
    isLoadingProjects,
    isGetProjectManagerError,
    isGetProjectManagerLoading,
    projectManager,
    projectManagerId,
  }
}
