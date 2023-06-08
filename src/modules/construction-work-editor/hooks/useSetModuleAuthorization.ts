import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {ModuleSlug} from '@/modules/slugs'
import {removeAuthorizedModule, addAuthorizedModule} from '@/store'

export const useSetModuleAuthorization = () => {
  const dispatch = useDispatch()
  const setModuleAuthorization = useCallback(
    (
      getProjectManagerError: FetchBaseQueryError | SerializedError | undefined,
      isGetProjectManagerSuccess: boolean,
    ) => {
      const hasUnauthenticatedError =
        getProjectManagerError &&
        'status' in getProjectManagerError &&
        ([403, 404] as Array<FetchBaseQueryError['status']>).includes(
          getProjectManagerError.status,
        )

      if (hasUnauthenticatedError) {
        dispatch(removeAuthorizedModule(ModuleSlug['construction-work-editor']))
        return
      }
      if (isGetProjectManagerSuccess) {
        dispatch(addAuthorizedModule(ModuleSlug['construction-work-editor']))
      }
    },
    [dispatch],
  )

  return {setModuleAuthorization}
}
