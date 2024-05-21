import {useCallback} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useProjectFollowMutation} from '@/modules/construction-work/service'
import {ConstructionWorkEditorResponseProject} from '@/modules/construction-work-editor/types'

export const useFollowAuthorizedProjects = () => {
  const [followProject] = useProjectFollowMutation()
  const {registerDeviceIfPermitted} = useRegisterDevice()

  const follow = useCallback(
    (authorizedProjects: ConstructionWorkEditorResponseProject[]) => {
      if (authorizedProjects.length < 20) {
        authorizedProjects.forEach(async ({id}) => {
          await followProject({id: Number(id)})
        })
      void registerDeviceIfPermitted(true)
      }
    },
    [followProject, registerDeviceIfPermitted],
  )

  return {follow}
}
