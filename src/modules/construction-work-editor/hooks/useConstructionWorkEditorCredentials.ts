import {useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

export const useSetConstructionWorkEditorCredentials = () => {
  const dispatch = useDispatch()
  return useCallback(
    (constructionWorkEditorId: string) =>
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: constructionWorkEditorId,
          }),
        }),
      ),
    [dispatch],
  )
}

export const useConstructionWorkEditorCredentials = () => {
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const setConstructionWorkEditorCredentials =
    useSetConstructionWorkEditorCredentials()
  useEffect(() => {
    if (constructionWorkEditorId) {
      setConstructionWorkEditorCredentials(constructionWorkEditorId)
    }
  }, [setConstructionWorkEditorCredentials, constructionWorkEditorId])
}
