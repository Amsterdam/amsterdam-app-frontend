import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
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

  return {
    isGetProjectManagerError,
    isGetProjectManagerLoading,
    projectManager,
    constructionWorkEditorId,
  }
}
