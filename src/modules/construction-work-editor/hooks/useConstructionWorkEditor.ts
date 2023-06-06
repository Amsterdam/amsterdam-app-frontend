import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'

export const useConstructionWorkEditor = () => {
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const {
    data: projectManager,
    isSuccess: isGetProjectManagerSuccess,
    isError: isGetProjectManagerError,
    error: getProjectManagerError,
    isLoading: isGetProjectManagerLoading,
  } = useGetProjectManagerQuery(
    constructionWorkEditorId ? {id: constructionWorkEditorId} : skipToken,
  )

  return {
    getProjectManagerError,
    isGetProjectManagerError,
    isGetProjectManagerLoading,
    isGetProjectManagerSuccess,
    projectManager,
    constructionWorkEditorId,
  }
}
