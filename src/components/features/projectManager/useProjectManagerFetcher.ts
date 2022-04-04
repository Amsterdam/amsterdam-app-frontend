import {useSelector} from 'react-redux'
import {useGetProjectManagerQuery, useGetProjectsQuery} from '../../../services'
import {selectProjectManager} from './projectManagerSlice'

export const useProjectManagerFetcher = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const {data: projectManager, isLoading: isProjectManagerLoading} =
    useGetProjectManagerQuery({id: projectManagerId}, {skip: !projectManagerId})

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
  return {
    authorizedProjects,
    isGetProjectsSuccess,
    isLoadingProjects,
    isProjectManagerLoading,
    projectManager,
    projectManagerId,
  }
}
