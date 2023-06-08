import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {addConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {setCredentials} from '@/store'
import {encryptWithAES} from '@/utils'

export const useStoreIdAndManagerToken = () => {
  const dispatch = useDispatch()
  const storePersist = useCallback(
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

  return {storePersist}
}
