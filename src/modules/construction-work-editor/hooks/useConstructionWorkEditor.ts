import {createSelector} from '@reduxjs/toolkit'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {useGetProjectsQuery} from '@/modules/construction-work/service'
import {ProjectsItem} from '@/modules/construction-work/types'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'

export const useConstructionWorkEditor = () => {
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const {
    data: projectManager,
    isError: isGetProjectManagerError,
    isLoading: isGetProjectManagerLoading,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId ? {id: constructionWorkEditorId} : skipToken,
  )

  const selectAuthProjects = useMemo(
    () =>
      createSelector(
        (result: {data?: ProjectsItem[]}) => result.data,
        data =>
          data?.filter(
            project =>
              projectManager?.projects.includes(project.identifier) ?? [],
          ),
      ),
    [projectManager?.projects],
  )

  const {
    isError: isGetProjectsError,
    isSuccess: isGetProjectsSuccess,
    isLoading: isLoadingProjects,
    authorizedProjects,
  } = useGetProjectsQuery(
    {
      fields: ['identifier', 'subtitle', 'title', 'images'],
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
    constructionWorkEditorId,
  }
}
