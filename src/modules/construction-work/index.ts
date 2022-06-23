import {ModuleClientConfig} from '../types'
import {ConstructionWorkStack} from './Stack'
import {projectManagerSlice} from './components/project-manager'
import {projectsByTextSlice} from './components/projects'
import {ConstructionWorkRouteName} from './routes'

export const module: ModuleClientConfig = {
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectManager]: 'project-manager/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  slug: 'construction-work',
  stack: ConstructionWorkStack,
  state: [projectsByTextSlice, projectManagerSlice],
}
