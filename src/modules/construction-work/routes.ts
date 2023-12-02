import {ProjectDetailSegment} from '@/modules/construction-work/types/project'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectDetailSegment = 'ProjectDetailSegment',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
  search = 'ConstructionWorkSearch',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.search]: undefined
  [ConstructionWorkRouteName.project]: {id: number}
  [ConstructionWorkRouteName.projectDetailSegment]: {
    body: ProjectDetailSegment
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectNews]: {id: number; projectId?: number}
  [ConstructionWorkRouteName.projectWarning]: {id: number; projectId?: number}
}

export enum ConstructionWorkModalName {}

export type ConstructionWorkModalParams = Record<string, never>
