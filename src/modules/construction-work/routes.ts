import {ProjectIdAndTitle} from '@/modules/construction-work/screens/create-notification'
import {ProjectBody} from '@/modules/construction-work/types'

export enum ConstructionWorkRouteName {
  createNotification = 'CreateNotification',
  project = 'Project',
  projects = 'Projects',
  projectBody = 'ProjectBody',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.createNotification]: {project: ProjectIdAndTitle}
  [ConstructionWorkRouteName.projects]: undefined
  [ConstructionWorkRouteName.project]: {id: string}
  [ConstructionWorkRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectNews]: {id: string}
  [ConstructionWorkRouteName.projectWarning]: {id: string}
}
