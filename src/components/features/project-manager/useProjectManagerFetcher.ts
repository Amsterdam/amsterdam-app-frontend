import {createSelector} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {useGetProjectManagerQuery, useGetProjectsQuery} from '../../../services'
import {Project} from '../../../types'
import {selectProjectManager} from './projectManagerSlice'

export const useProjectManagerFetcher = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const {data: projectManager, isLoading: isProjectManagerLoading} =
    useGetProjectManagerQuery({id: projectManagerId}, {skip: !projectManagerId})

  // avoid unnecessary re-renders
  const selectAuthProjects = useMemo(() => {
    return createSelector(
      (result: {data?: Project[]}) => result.data,
      data =>
        data?.filter(
          project =>
            projectManager?.projects.includes(project.identifier) ?? [],
        ),
    )
  }, [projectManager?.projects])

  const {
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
    isGetProjectsSuccess,
    isLoadingProjects,
    isProjectManagerLoading,
    projectManager,
    projectManagerId,
  }
}
