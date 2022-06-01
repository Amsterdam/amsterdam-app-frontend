import {ModuleClientConfig} from '../types'
import {ConstructionWorkStack} from './Stack'
import {projectManagerSlice} from './components/project-manager'
import {projectsByTextSlice} from './components/projects'
import {ProjectsRouteName} from './routes'

export const module: ModuleClientConfig = {
  linking: {
    [ProjectsRouteName.projectNews]: 'news/:id',
    [ProjectsRouteName.projectManager]: 'project-manager/:id',
    [ProjectsRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  slug: 'construction-work',
  stack: ConstructionWorkStack,
  state: [projectsByTextSlice, projectManagerSlice],
}
