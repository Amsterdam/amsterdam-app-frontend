import {ClientModule} from '../types'
import {ProjectsStack} from './Stack'
import {projectManagerSlice} from './components/project-manager'
import {projectsByTextSlice} from './components/projects'
import {ProjectsRouteName} from './routes'

export const module: ClientModule = {
  linking: {
    [ProjectsRouteName.projectNews]: 'news/:id',
    [ProjectsRouteName.projectManager]: 'project-manager/:id',
    [ProjectsRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ProjectsModule',
  slug: 'construction-work',
  stack: ProjectsStack,
  state: [projectsByTextSlice, projectManagerSlice],
}
