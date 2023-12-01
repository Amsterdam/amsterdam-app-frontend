import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSetModuleAuthorization} from '@/modules/construction-work-editor/hooks/useSetModuleAuthorization'
import {useGetProjectManagerQuery} from '@/modules/construction-work-editor/services'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'

export const PreRenderComponent = () => {
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const {
    isSuccess: isGetProjectManagerSuccess,
    error: getProjectManagerError,
    isLoading: isGetProjectManagerLoading,
  } = useGetProjectManagerQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructionWorkEditorId ? {id: constructionWorkEditorId} : skipToken,
  )
  const {setModuleAuthorization} = useSetModuleAuthorization()

  useEffect(() => {
    !isGetProjectManagerLoading &&
      setModuleAuthorization(isGetProjectManagerSuccess, getProjectManagerError)
  }, [
    isGetProjectManagerLoading,
    getProjectManagerError,
    isGetProjectManagerSuccess,
    setModuleAuthorization,
  ])

  return null
}
