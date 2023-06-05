import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useConstructionWorkEditor} from '@/modules/construction-work-editor/hooks/useConstructionWorkEditor'
import {ModuleSlug} from '@/modules/slugs'
import {addProhibitedModule, removeProhibitedModule} from '@/store'

export const PreRenderComponent = () => {
  const dispatch = useDispatch()
  const {constructionWorkEditorId, getProjectManagerError} =
    useConstructionWorkEditor()

  useEffect(() => {
    if (!constructionWorkEditorId) {
      dispatch(addProhibitedModule(ModuleSlug['construction-work-editor']))
      return
    }
    if (getProjectManagerError) {
      if ('status' in getProjectManagerError) {
        dispatch(addProhibitedModule(ModuleSlug['construction-work-editor']))
        return
      }
    }
    dispatch(removeProhibitedModule(ModuleSlug['construction-work-editor']))
  }, [constructionWorkEditorId, getProjectManagerError, dispatch])
  return null
}
