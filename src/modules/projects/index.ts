import {ClientModule} from '../types'
import {ProjectsStack} from './Stack'
import {projectManagerSlice} from './components/project-manager'
import {projectsByTextSlice} from './components/projects'

export const module: ClientModule = {
  linking: {},
  name: 'ProjectsModule',
  slug: 'construction-work',
  stack: ProjectsStack,
  state: [projectsByTextSlice, projectManagerSlice],
}
