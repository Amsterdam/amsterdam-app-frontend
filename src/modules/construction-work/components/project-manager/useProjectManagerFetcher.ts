import {createSelector} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {selectProjectManager} from '@/modules/construction-work/components/project-manager/projectManagerSlice'
import {
  useGetProjectManagerQuery,
  useGetProjectsQuery,
} from '@/modules/construction-work/construction-work.service'
import {ProjectsItem} from '@/types'

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
