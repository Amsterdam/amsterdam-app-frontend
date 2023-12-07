import {ProjectSegment} from '@/modules/construction-work/types/project'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectNews = 'ProjectNews',
  projectSegment = 'ProjectSegment',
  projectWarning = 'ProjectWarning',
  search = 'ConstructionWorkSearch',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.search]: undefined
  [ConstructionWorkRouteName.project]: {id: number}
  [ConstructionWorkRouteName.projectSegment]: {
    body: ProjectSegment
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectNews]: {id: number; projectId?: number}
  [ConstructionWorkRouteName.projectWarning]: {id: number; projectId?: number}
}

export enum ConstructionWorkModalName {}

export type ConstructionWorkModalParams = Record<string, never>
