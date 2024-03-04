import {useCallback} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useProjectFollowMutation} from '@/modules/construction-work/service'
import {ConstructionWorkEditorResponseProject} from '@/modules/construction-work-editor/types'

export const useFollowAuthorizedProjects = () => {
  const [followProject] = useProjectFollowMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()

  const follow = useCallback(
    (authorizedProjects: ConstructionWorkEditorResponseProject[]) => {
      authorizedProjects.forEach(async ({id}) => {
        await followProject({id: Number(id)})
      })
      registerDeviceWithPermission()
    },
    [followProject, registerDeviceWithPermission],
  )

  return {follow}
}
