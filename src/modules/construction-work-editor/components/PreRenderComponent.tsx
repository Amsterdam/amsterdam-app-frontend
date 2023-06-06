import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useConstructionWorkEditor} from '@/modules/construction-work-editor/hooks/useConstructionWorkEditor'
import {ModuleSlug} from '@/modules/slugs'
import {addAuthorizedModule, removeAuthorizedModule} from '@/store'

export const PreRenderComponent = () => {
  const dispatch = useDispatch()
  const {
    constructionWorkEditorId,
    getProjectManagerError,
    isGetProjectManagerSuccess,
  } = useConstructionWorkEditor()

  useEffect(() => {
    if (!constructionWorkEditorId) {
      dispatch(removeAuthorizedModule(ModuleSlug['construction-work-editor']))
      return
    }
    if (getProjectManagerError) {
      if (
        'status' in getProjectManagerError &&
        ([403, 404] as Array<FetchBaseQueryError['status']>).includes(
          getProjectManagerError.status,
        )
      ) {
        dispatch(removeAuthorizedModule(ModuleSlug['construction-work-editor']))
        return
      }
    }
    if (isGetProjectManagerSuccess) {
      dispatch(addAuthorizedModule(ModuleSlug['construction-work-editor']))
    }
  }, [
    constructionWorkEditorId,
    getProjectManagerError,
    isGetProjectManagerSuccess,
    dispatch,
  ])
  return null
}
