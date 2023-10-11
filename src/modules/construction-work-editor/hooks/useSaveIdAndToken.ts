import {AUTH_PASSWORD} from '@env'
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {addConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {setCredentials} from '@/store/slices/auth'
import {encryptWithAES} from '@/utils/encryption'

export const useSaveIdAndToken = () => {
  const dispatch = useDispatch()
  const saveIdAndToken = useCallback(
    (id: string) => {
      dispatch(addConstructionWorkEditorId(id))
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: AUTH_PASSWORD ?? '',
            salt: id,
          }),
        }),
      )
    },
    [dispatch],
  )

  return {saveIdAndToken}
}
