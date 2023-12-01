import {useCallback} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useProjectsFollowPostMutation} from '@/modules/construction-work/service'
import {ConstructionWorkEditorResponseProject} from '@/modules/construction-work-editor/types'

export const useFollowAuthorizedProjects = () => {
  const [followProject] = useProjectsFollowPostMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()

  const follow = useCallback(
    (authorizedProjects: ConstructionWorkEditorResponseProject[]) => {
      authorizedProjects.forEach(async ({id}) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await followProject({id})
      })
      registerDeviceWithPermission()
    },
    [followProject, registerDeviceWithPermission],
  )

  return {follow}
}
