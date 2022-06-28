import {projectManagerSlice} from '@/modules/construction-work/components/project-manager'
import {projectsByTextSlice} from '@/modules/construction-work/components/projects'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectManager]: 'project-manager/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  slug: 'construction-work',
  state: [projectsByTextSlice, projectManagerSlice],
}
