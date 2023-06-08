import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {ModuleSlug} from '@/modules/slugs'
import {removeAuthorizedModule, addAuthorizedModule} from '@/store'
import {isApiAuthorizationError} from '@/utils'

export const useSetModuleAuthorization = () => {
  const dispatch = useDispatch()
  const setModuleAuthorization = useCallback(
    (
      getProjectManagerError: FetchBaseQueryError | SerializedError | undefined,
      isGetProjectManagerSuccess: boolean,
    ) => {
      if (
        getProjectManagerError &&
        isApiAuthorizationError(getProjectManagerError)
      ) {
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
