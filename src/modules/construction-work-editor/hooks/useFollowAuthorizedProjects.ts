import {useCallback} from 'react'
import {useRegisterDevice} from '@/hooks'
import {useFollowProjectMutation} from '@/modules/construction-work/service'
import {ConstructionWorkEditorResponseProject} from '@/modules/construction-work-editor/types'

export const useFollowAuthorizedProjects = () => {
  const [followProject] = useFollowProjectMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()

  const follow = useCallback(
    (authorizedProjects: ConstructionWorkEditorResponseProject[]) => {
      authorizedProjects.forEach(async ({identifier}) => {
        await followProject({project_id: identifier})
      })
      registerDeviceWithPermission()
    },
    [followProject, registerDeviceWithPermission],
  )

  return {follow}
}
