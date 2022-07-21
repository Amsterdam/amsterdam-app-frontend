import {createSelector} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {selectProjectManager} from '@/modules/construction-work-editor/slice'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {ProjectsItem} from '@/modules/construction-work/types'

export const useProjectManager = () => {
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
