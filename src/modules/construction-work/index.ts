import {ModuleSlugs} from '../slugs'
import {projectManagerSlice} from '@/modules/construction-work/components/project-manager'
import {constructionWorkSlice} from '@/modules/construction-work/construction-work.slice'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectManager]: 'project-manager/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  slug: ModuleSlugs['construction-work'],
  state: [constructionWorkSlice, projectManagerSlice],
}
