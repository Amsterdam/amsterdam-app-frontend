import {useEffect} from 'react'
import {ApiSlug} from '@/environment'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAddDisabledPushModuleMutation} from '@/modules/user/service'
import {selectDisabledModules} from '@/store/slices/modules'
import {Permissions} from '@/types/permissions'

export const DisablePushForDisabledModules = () => {
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)
  const {hasPermission} = usePermission(Permissions.notifications)
  const [addDisabledPushModule] = useAddDisabledPushModuleMutation()

  useEffect(() => {
    if (hasPermission) {
      userDisabledModulesBySlug.forEach(module => {
        void addDisabledPushModule(module as ApiSlug) // TODO this will be 1 call when this ticket is done: #152184
      })
    }
  }, [addDisabledPushModule, hasPermission, userDisabledModulesBySlug])

  return null
}
