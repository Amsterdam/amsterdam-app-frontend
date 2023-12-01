import {ProjectBody} from '@/modules/construction-work/types/project'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectBody = 'ProjectBody',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
  search = 'ConstructionWorkSearch',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.search]: undefined
  [ConstructionWorkRouteName.project]: {id: number}
  [ConstructionWorkRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectNews]: {id: number; projectId?: number}
  [ConstructionWorkRouteName.projectWarning]: {id: number; projectId?: number}
}

export enum ConstructionWorkModalName {}

export type ConstructionWorkModalParams = Record<string, never>
