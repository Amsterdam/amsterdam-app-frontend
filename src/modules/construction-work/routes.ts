import {ProjectIdAndTitle} from '@/modules/construction-work/screens/create-notification'
import {ProjectBody} from '@/types'

export enum ConstructionWorkRouteName {
  authorizedProjects = 'AuthorizedProjects',
  createNotification = 'CreateNotification',
  project = 'Project',
  projects = 'Projects',
  projectBody = 'ProjectBody',
  projectManager = 'ProjectManager',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.authorizedProjects]: {projectManagerId: string}
  [ConstructionWorkRouteName.createNotification]: {project: ProjectIdAndTitle}
  [ConstructionWorkRouteName.projects]: undefined
  [ConstructionWorkRouteName.project]: {id: string}
  [ConstructionWorkRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectManager]: {id: string}
  [ConstructionWorkRouteName.projectNews]: {id: string}
  [ConstructionWorkRouteName.projectWarning]: {id: string}
}
