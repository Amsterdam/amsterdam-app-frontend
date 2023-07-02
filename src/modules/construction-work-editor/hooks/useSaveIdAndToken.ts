import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {addConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {setCredentials} from '@/store/authSlice'
import {encryptWithAES} from '@/utils'

export const useSaveIdAndToken = () => {
  const dispatch = useDispatch()
  const saveIdAndToken = useCallback(
    (id: string) => {
      dispatch(addConstructionWorkEditorId(id))
      dispatch(
        setCredentials({
          managerToken: encryptWithAES({
            password: process.env.AUTH_PASSWORD ?? '',
            salt: id,
          }),
        }),
      )
    },
    [dispatch],
  )

  return {saveIdAndToken}
}
